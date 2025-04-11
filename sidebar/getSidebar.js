import fs from "node:fs";
import { sortHsMeetings } from "./sortHsMeetings";
import { getFrontmatter, getIndexFileContent, readFile, removeFileExtension } from "./utils";

/*
Available frontmatter keys:
- title: string
- date: string
- child-directories-sort: "asc" | "desc"
- child-files-sort: "asc" | "desc" | "date"

Notes:
- date should be parsable by new Date()
- child-directories-sort will sort all directories in same directory, but not all subdirectories.
- child-files-sort will sort all files in same directory and all files in all subdirectories.
*/

const HS_MEETINGS_FOLDER = "/motereferater-fra-hovedstyret/";

const MARKDOWN_FILE_EXTENSIONS = [".md", ".mdx"];
const INDEX_FILE_NAMES = MARKDOWN_FILE_EXTENSIONS.map((ext) => `index${ext}`);
const BOUNDRY_SLASHES_REGEX = /^\/|\/$/g;
const BASE_PATH = "src/content/docs";

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
 * @param {boolean} includeContent - Whether to include the content of the files.
 * @returns {Array} An array of sidebar items.
 * @example
 * // Assuming the file names are ["file1.md", "file2.md"] and the slug is "slug"
 * const sidebarItems = fileNamesToSidebarItem(["file1.md", "file2.md"], "slug")
 * sidebarItems // => [{ label: "file1", slug: "slug/file1" }, { label: "file2", slug: "slug/file2" }]
 *
 * const sidebarItemsWithContent = fileNamesToSidebarItem(["file1.md", "file2.md"], "slug", true)
 * sidebarItemsWithContent // => [{ label: "file1", slug: "slug/file1", content: "..." }, { label: "file2", slug: "slug/file2", content: "..." }]
 */
const fileNamesToSidebarItem = (fileNames, slug, includeContent) => {
	return fileNames.reduce((items, fileName) => {
		const content = readFile(`${BASE_PATH}/${slug}/${fileName}`);

		if (!content) {
			return items;
		}

		const label = getFrontmatter(content, "title");
		const fileSlug = `${slug}/${removeFileExtension(fileName)}`;

		if (includeContent) {
			items.push({ label, slug: fileSlug, content });
		} else {
			items.push({ label, slug: fileSlug });
		}

		return items;
	}, []);
};

/**
 * Gets the sidebar structure of the entire wiki. If given a slug, it will only get the sidebar for that slug.
 *
 * @param {string} [rawSlug=""] - The slug to get the sidebar for. If empty, it will get the sidebar for the entire wiki.
 * @param {boolean} [__sortChildFilesMethod=undefined] - The method to sort child files. Can be "asc", "desc", or "date".
 * @returns {Array} The sidebar structure for Astro.
 */
export const getSidebar = (rawSlug = "", __sortChildFilesMethod = undefined) => {
	const slug = rawSlug.replace(BOUNDRY_SLASHES_REGEX, "");
	const path = `${BASE_PATH}/${slug}`;

	const indexContent = getIndexFileContent(path, INDEX_FILE_NAMES);
	const label = indexContent ? getFrontmatter(indexContent, "title") : slug.split("/").pop();
	const index = indexContent ? { label, slug } : [];

	const [fileNames, childDirectoriesNames] = getChildFilesAndDirectoriesNames(path);

	const sortChildFilesMethod = __sortChildFilesMethod || getFrontmatter(indexContent, "child-files-sort");

	let files = fileNamesToSidebarItem(fileNames, slug, sortChildFilesMethod);

	if (sortChildFilesMethod === "asc") {
		files.sort((a, b) => a.label.localeCompare(b.label));
	} else if (sortChildFilesMethod === "desc") {
		files.sort((a, b) => b.label.localeCompare(a.label));
	} else if (sortChildFilesMethod === "date") {
		if (slug.includes(HS_MEETINGS_FOLDER)) {
			files = sortHsMeetings(files, slug);
		} else {
			files.sort((a, b) => {
				const aDate = new Date(getFrontmatter(a.content, "date") || 0);
				const bDate = new Date(getFrontmatter(b.content, "date") || 0);
				return bDate - aDate;
			});
		}
	}

	if (getFrontmatter(indexContent, "child-directories-sort") === "asc") {
		childDirectoriesNames.sort((a, b) => a.localeCompare(b));
	} else if (getFrontmatter(indexContent, "child-directories-sort") === "desc") {
		childDirectoriesNames.sort((a, b) => b.localeCompare(a));
	}

	const childDirectories = childDirectoriesNames.flatMap((directory) =>
		getSidebar(`${slug}/${directory}`, sortChildFilesMethod)
	);

	const items = [index, ...childDirectories, ...files].flat();

	return [{ label, collapsed: true, items }];
};
