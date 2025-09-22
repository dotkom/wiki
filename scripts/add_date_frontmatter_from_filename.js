import fs from "node:fs";
import path from "node:path";
import getFrontMatter from "gray-matter";

const directoryPath = path.join(
  process.cwd(),
  // Update this path to where you want to start processing files
  "src/content/docs/info/innsikt-og-interface/motereferater-fra-hovedstyret"
);

function forceQuotes(yamlString) {
  return yamlString.replace(
    /^---\r?\n([\s\S]+?)\r?\n---/,
    (_match, frontmatterContent) => {
      const processedFrontmatter = frontmatterContent.replace(
        /:(\s*)([^"'][^\r\n]*)/g,
        (pairMatch, space, value) => {
          const trimmed = value.trim();
          // If already quoted (single or double) or is "true"/"false", do nothing.
          if (
            (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
            (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
            trimmed.toLowerCase() === "true" ||
            trimmed.toLowerCase() === "false"
          ) {
            return pairMatch;
          }
          // Escape internal single quotes by doubling them.
          const escaped = value.replace(/'/g, "''");
          return `:${space}'${escaped.trim()}'`;
        }
      );
      return `---\n${processedFrontmatter}\n---`;
    }
  );
}

const processFile = (filePath) => {
  const content = fs.readFileSync(filePath, "utf-8");
  const parsed = getFrontMatter(content);
  if (!parsed.data.date) {
    const fileName = path.basename(filePath, path.extname(filePath));
    parsed.data.date = fileName;
    const newContent = forceQuotes(
      getFrontMatter.stringify(parsed.content, parsed.data)
    );
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated date for: ${filePath}`);
  }
};

const walkDir = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const absolute = path.join(dir, file);
    if (fs.lstatSync(absolute).isDirectory()) {
      walkDir(absolute);
    } else if (absolute.endsWith(".md")) {
      processFile(absolute);
    }
  });
};

walkDir(directoryPath);
