import fs from "node:fs";
import getFrontMatter from "gray-matter";

const BOUNDRY_SLASHES_REGEX = /^\/|\/$/g;
const INDEX_FILE_NAMES = ["md", "mdx"].map((ext) => `index.${ext}`);
const BASE_PATH = "src/content/docs";

export const readFile = (slug) => {
    const path = `${BASE_PATH}/${slug}`;

    if (!fs.existsSync(path)) {
        return null;
    }

    return fs.readFileSync(path, "utf-8");
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

export const removeFileExtension = (fileName) => {
    const fileExtension = fileName.split(".").pop();

    return fileName.replace(`.${fileExtension}`, "");
};

export const trimSlashes = (string) => string.replace(BOUNDRY_SLASHES_REGEX, "");
