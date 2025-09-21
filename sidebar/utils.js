import fs from "node:fs";
import matter from "gray-matter";

const BOUNDRY_SLASHES_REGEX = /^\/|\/$/g;
const INDEX_FILE_NAMES = ["md", "mdx"].map((ext) => `index.${ext}`);
const BASE_PATH = "src/content/docs";

export const getPathFromSlug = (slug) => `${BASE_PATH}/${slug}`;

export const readFile = (slug) => {
    const path = getPathFromSlug(slug);

    if (!fs.existsSync(path)) {
        return null;
    }

    return fs.readFileSync(path, "utf-8");
};

export const getFrontmatterFromContent = (content) => (content ? matter(content).data : null);

export const getFrontmatterFromSlug = (slug) => {
    const content = readFile(slug);

    return content && getFrontmatterFromContent(content);
};

/**
 * Checks if a file is an index file.
 *
 * @param {string} fileNameWithExtension - The file name with extension to check.
 * @returns {boolean} - True if the file is an index file, false otherwise.
 */
export const isIndexFile = (fileNameWithExtension) => {
    const fileName = fileNameWithExtension.split("/").pop();

    return INDEX_FILE_NAMES.some((indexFileName) => fileName === indexFileName);
};

export const getIndexFrontmatter = (slugOfParentDirectory) => {
    for (const index of INDEX_FILE_NAMES) {
        const frontmatter = getFrontmatterFromSlug(`${slugOfParentDirectory}/${index}`);

        if (frontmatter) {
            return frontmatter;
        }
    }

    return null;
};

export const removeFileExtension = (fileName) => {
    const fileExtension = fileName.split(".").pop();

    return fileName.replace(`.${fileExtension}`, "");
};

export const trimSlashes = (string) => string.replace(BOUNDRY_SLASHES_REGEX, "");
