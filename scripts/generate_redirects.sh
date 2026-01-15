#!/usr/bin/env bash
set -euo pipefail

# IMPORTANT: If you run this script, run it with different values for the M flag at line 39 (-M30) and compare results,
# and amend them as needed. The 30% rename threshold is a balance between catching real renames and avoiding false
# positives. Running it with -M50, then -M01 will show you a baseline (mostly real renames) and a maximum (everything
# that changed even slightly).

# Usage: ./scripts/generate_redirects.sh origin/main HEAD redirects-output.txt
BASE=${1:-origin/main}
HEAD=${2:-HEAD}
OUTFILE=${3:-redirects-output.txt}

normalize() {
  local p="$1"
  p="${p#src/content/docs}"   # strip docs root
  p="${p%.md}"; p="${p%.mdx}" # strip extension
  p="${p%/index}"             # strip index
  [[ "$p" != /* ]] && p="/$p" # ensure leading slash
  p="$(printf '%s' "$p" | sed -E 's#/+#/#g')"

  # Force trailing slash
  if [[ "$p" != "/" ]]; then
     echo "${p%/}/"
  else
     echo "/"
  fi
}

echo "Generating redirects from $BASE to $HEAD..."
: > "$OUTFILE"

# 1. Catch-all: Send ANY English link to the Norwegian equivalent
# This replaces all the specific /en/ lines you had before.
echo "/en/* /:splat 301" >> "$OUTFILE"

# 2. Detect Renames
# Filter: We ONLY process files starting with src/content/docs
git --no-pager diff -M30 --diff-filter=R --name-status -z "$BASE" "$HEAD" -- |{
  while :; do
    IFS= read -r -d '' status || break
    IFS= read -r -d '' old || break
    IFS= read -r -d '' new || break

    # SAFETY CHECK: Only care if BOTH files are in src/content/docs
    if [[ "$old" != src/content/docs* ]] || [[ "$new" != src/content/docs* ]]; then
      continue
    fi

    from="$(normalize "$old")"
    to="$(normalize "$new")"

    [[ "$from" == "$to" ]] && continue

    from_clean="${from%/}"

    printf '%s/ %s 301\n' "$from_clean" "$to"
    printf '%s %s 301\n' "$from_clean" "$to"

  done
} >> "$OUTFILE"

# Sort and Remove Duplicates
if [[ -s "$OUTFILE" ]]; then
  LC_ALL=C sort -u "$OUTFILE" -o "$OUTFILE"
fi

echo "✅ Redirects written to $OUTFILE"