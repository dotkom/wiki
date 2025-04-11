import fs from "node:fs";
import matter from "gray-matter";

/*
Available frontmatters:
  - title: string
  - sort-child-directories-desc: boolean
*/

const MARKDOWN_FILE_EXTENSIONS = [".md", ".mdx"];
const INDEX_FILE_NAMES = MARKDOWN_FILE_EXTENSIONS.map((ext) => `index${ext}`);
const BOUNDRY_SLASHES_REGEX = /^\/|\/$/g;
const BASE_PATH = "src/content/docs";

const readFile = (filePath) => {
	if (!fs.existsSync(filePath)) {
		return null;
	}

	return fs.readFileSync(filePath, "utf-8");
};

const getFrontmatter = (content, key) => (content ? matter(content).data[key] : {});

const getIndexFileContent = (path) => {
	for (const index of INDEX_FILE_NAMES) {
		const indexFilePath = `${path}/${index}`;
		const indexFileContent = readFile(indexFilePath);

		if (indexFileContent) {
			return indexFileContent;
		}
	}

	return null;
};

const isMarkdownFile = (fileName) => {
	const fileExtension = fileName.split(".").pop();

	return fileName.includes(".") && MARKDOWN_FILE_EXTENSIONS.includes(`.${fileExtension}`);
};

const removeFileExtension = (fileName) => {
	const fileExtension = fileName.split(".").pop();

	return fileName.replace(`.${fileExtension}`, "");
};

/**
 * Gets all file and directory names in a given path. Excludes index.md files.
 *
 * @param {string} path - The path to the directory.
 * @returns {Array} An array containing two arrays: the first with file names and the second with directory names.
 * @example
 * // Assuming the directory structure is as follows:
 * // directory
 * // ├── index.md
 * // ├── file1.md
 * // ├── file2.md
 * // └── subdirectory
 * //     └── file3.md
 * const [fileNames, directoryNames] = getChildFilesAndDirectoriesNames("directory")
 * fileNames // => ["file1.md", "file2.md"]
 * directoryNames // => ["subdirectory"]
 */
const getChildFilesAndDirectoriesNames = (path) =>
	fs.readdirSync(path).reduce(
		([files, directories], item) => {
			const itemPath = `${path}/${item}`;

			if (fs.lstatSync(itemPath).isDirectory()) {
				return [files, [...directories, item]];
			}

			// Exclude index.md
			if (INDEX_FILE_NAMES.includes(item)) {
				return [files, directories];
			}

			return [[...files, item], directories];
		},
		[[], []]
	);

/**
 * Creates sidebar items from file names and a slug.
 *
 * @param {Array} fileNames - The file names to create sidebar items from.
 * @param {string} slug - The slug to use for the sidebar items.
 * @returns {Array} An array of sidebar items.
 * @example
 * // Assuming the file names are ["file1.md", "file2.md"] and the slug is "slug"
 * const sidebarItems = fileNamesToSidebarItem(["file1.md", "file2.md"], "slug")
 * sidebarItems // => [{ label: "file1", slug: "slug/file1" }, { label: "file2", slug: "slug/file2" }]
 */
const fileNamesToSidebarItem = (fileNames, slug) => {
	return fileNames.reduce((items, fileName) => {
		const content = readFile(`${BASE_PATH}/${slug}/${fileName}`);

		if (!content) {
			return items;
		}

		const label = getFrontmatter(content, "title");
		const fileSlug = `${slug}/${removeFileExtension(fileName)}`;

		items.push({ label, slug: fileSlug });

		return items;
	}, []);
};

/**
 * Gets the sidebar structure of the entire wiki. If given a slug, it will only get the sidebar for that slug.
 *
 * @param {string} [rawSlug=""] - The slug to get the sidebar for. If empty, it will get the sidebar for the entire wiki.
 * @returns {Array} The sidebar structure for Astro.
 */
export const getSidebar = (rawSlug = "") => {
	const slug = rawSlug.replace(BOUNDRY_SLASHES_REGEX, "");
	const path = `${BASE_PATH}/${slug}`;

	const indexContent = getIndexFileContent(path);
	const label = indexContent ? getFrontmatter(indexContent, "title") : slug.split("/").pop();
	const index = indexContent ? { label, slug } : [];

	const [fileNames, childDirectoriesNames] = getChildFilesAndDirectoriesNames(path);

	const files = fileNamesToSidebarItem(fileNames, slug);

	if (getFrontmatter(indexContent, "sort-child-directories-desc") === true) {
		childDirectoriesNames.sort((a, b) => b.localeCompare(a));
	}

	const childDirectories = childDirectoriesNames.flatMap((directory) => getSidebar(`${slug}/${directory}`, false));

	const items = [index, ...childDirectories, ...files].flat();

	return [{ label, collapsed: true, items }];
};
