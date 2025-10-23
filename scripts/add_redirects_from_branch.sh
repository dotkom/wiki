#!/usr/bin/env bash
set -euo pipefail

# "<BASE path> <HEAD path> 301"
BASE=${1:-origin/main}
HEAD=${2:-HEAD}
OUTFILE=${3:-redirects-output.txt}

normalize() {
  local p="$1"
  p="${p#src/content/docs}" # strip docs base path
  p="${p%.md}"; p="${p%.mdx}" # strip .md/.mdx
  p="${p%/index}" # collapse trailing /index -> (parent)
  [[ "$p" != /* ]] && p="/$p" # ensure leading slash
  p="$(printf '%s' "$p" | sed -E 's#/+#/#g')" # collapse duplicate slashes
  [[ -z "$p" || "$p" == "/" ]] && echo "/" || echo "$p"
}

echo "Writing redirects to $OUTFILE. This can take some time."

: > "$OUTFILE" # empty file

git --no-pager diff -M --diff-filter=ACMR --name-status -z "$BASE...$HEAD" -- |{
  while :; do
    IFS= read -r -d '' status || break

    if [[ ${status:0:1} == R || ${status:0:1} == C ]]; then
      IFS= read -r -d '' old || break
      IFS= read -r -d '' new || break

      from="$(normalize "$old")"
      to="$(normalize "$new")"
      [[ "$from" == "$to" ]] && continue # no-op

      printf '%s %s 301\n' "$from" "$to"
    else
      # Skip added, modified, or other single-file changes
      IFS= read -r -d '' dummy || break
    fi
  done
} >> "$OUTFILE"

# Remove duplicate redirects
if [[ -s "$OUTFILE" ]]; then
  LC_ALL=C sort -u "$OUTFILE" -o "$OUTFILE"
fi

echo "Redirects written to $OUTFILE"