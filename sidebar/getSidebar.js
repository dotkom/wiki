import fs from "node:fs";
import { groupHsMeetings } from "./groupHsMeetings";
import {
	getFrontmatterFromContent,
	getIndexFrontmatter,
	isIndexFile,
	readFile,
	getPathFromSlug,
	removeFileExtension,
	trimSlashes,
} from "./utils";
import { groupGeneralforsamlinger } from "./groupGeneralforsamlinger";
import { trimGeneralforsamlingerDirectoryLabel } from "./trimGeneralforsamlingerDirectoryLabel";

// See README for available frontmatter keys

const GENERALFORSAMLINGER_FOLDER = "generalforsamlinger";
const HS_MEETINGS_FOLDER = "motereferater-fra-hovedstyret/";

/**
 * Gets all file and directory names in a given slug. Excludes index.md files.
 *
 * @param {string} directorySlug - The slug of the directory.
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
const getChildFilesAndDirectoriesNames = (directorySlug) => {
	const path = getPathFromSlug(directorySlug);

	return fs.readdirSync(path).reduce(
		([files, directories], fileOrFolderName) => {
			const itemPath = `${path}/${fileOrFolderName}`;

			if (fs.lstatSync(itemPath).isDirectory()) {
				return [files, [...directories, fileOrFolderName]];
			}

			return [[...files, fileOrFolderName], directories];
		},
		[[], []]
	);
};

/**
 * Creates sidebar items from file names and a slug.
 *
 * @param {Array} fileNames - The file names to create sidebar items from.
 * @param {string} parentDirectorySlug - The slug to use for the sidebar items.
 * @param {boolean} includeFrontmatter - Whether to include the frontmatter of the files.
 * @returns {Array} An array of sidebar items.
 * @example
 * // Assuming the file names are ["file1.md", "file2.md"] and the slug is "slug"
 * fileNamesToSidebarItem(["file1.md", "file2.md"], "slug")
 * // [{ label: "File 1", slug: "slug/file1" }, { label: "File 2", slug: "slug/file2" }]
 *
 * fileNamesToSidebarItem(["file1.md", "file2.md"], "slug", true)
 * // [{ label: "File 1", slug: "slug/file1", frontmatter: { ... } }, { label: "File 2", slug: "slug/file2", frontmatter: null }]
 */
const fileNamesToSidebarItem = (fileNames, parentDirectorySlug, includeFrontmatter) => {
	return fileNames.reduce((items, fileName) => {
		// Build path/slug segments without introducing a leading slash when parent slug is empty
		const filePathSlug = parentDirectorySlug ? `${parentDirectorySlug}/${fileName}` : fileName;
		const content = readFile(filePathSlug);

		const fileNameWithoutExtension = removeFileExtension(fileName);
		const slug = parentDirectorySlug ? `${parentDirectorySlug}/${fileNameWithoutExtension}` : fileNameWithoutExtension;

		if (!content) {
			return items;
		}

		const frontmatter = getFrontmatterFromContent(content);

		if (!frontmatter) {
			return items;
		}

		const label = frontmatter.title || fileNameWithoutExtension;

		if (isIndexFile(fileName)) {
			items.push({ label, slug: parentDirectorySlug, frontmatter });
		} else if (includeFrontmatter) {
			items.push({ label, slug, frontmatter });
		} else {
			items.push({ label, slug });
		}

		return items;
	}, []);
};

const getIndexFile = (files, parentSlug) => {
	// Index files will use the parent directory as their slug
	const indexOfIndexFile = files.findIndex((file) => file.slug === parentSlug);

	if (indexOfIndexFile === -1) {
		return null;
	}

	return files.splice(indexOfIndexFile, 1)[0];
};

/**
 * Gets the sidebar structure of the entire wiki. If given a slug, it will only get the sidebar for that slug.
 *
 * @param {string} [rawSlug=""] - The slug to get the sidebar for. If empty, it will get the sidebar for the entire wiki.
 * @param {boolean} [__sortChildFilesMethod=undefined] - The method to sort child files. Can be "asc", "desc", or "date".
 * @returns {Array} The sidebar structure for Astro.
 */
export const getSidebar = (rawSlug = "", __sortChildFilesMethod = undefined) => {
	const slug = trimSlashes(rawSlug);

	const indexFrontmatter = getIndexFrontmatter(slug);
	let label = indexFrontmatter?.title || slug.split("/").pop();

	const [fileNames, childDirectoriesNames] = getChildFilesAndDirectoriesNames(slug);

	const sortChildFilesMethod = indexFrontmatter?.["child-files-sort"] || __sortChildFilesMethod;
	const sortChildDirectoriesMethod = indexFrontmatter?.["child-directories-sort"];

	// Turning file names into sidebar items
	const includeFrontmatter = sortChildFilesMethod === "date" || sortChildDirectoriesMethod === "date";
	let files = fileNamesToSidebarItem(fileNames, slug, includeFrontmatter);

	const indexFile = getIndexFile(files, slug);

	// Sorting child files
	if (sortChildFilesMethod === "asc") {
		files.sort((a, b) => a.label.localeCompare(b.label));
	} else if (sortChildFilesMethod === "desc") {
		files.sort((a, b) => b.label.localeCompare(a.label));
	} else if (sortChildFilesMethod === "date") {
		files.sort((a, b) => {
			const aDate = new Date(a.frontmatter?.date || 0);
			const bDate = new Date(b.frontmatter?.date || 0);
			return bDate - aDate;
		});

		// Grouping HS meetings
		if (slug.includes(HS_MEETINGS_FOLDER)) {
			files = groupHsMeetings(files, slug);
		}
	}

	// Sorting child directories
	if (sortChildDirectoriesMethod === "asc") {
		childDirectoriesNames.sort((a, b) => a.localeCompare(b));
	} else if (sortChildDirectoriesMethod === "desc") {
		childDirectoriesNames.sort((a, b) => b.localeCompare(a));
	}

	// Filling child directories with their files and directories
	let childDirectories = childDirectoriesNames.flatMap((directory) =>
		getSidebar(slug ? `${slug}/${directory}` : directory, sortChildFilesMethod)
	);

	// Sorting child directories by date
	if (sortChildDirectoriesMethod === "date") {
		childDirectories.sort((a, b) => {
			// Index file is always first in the array, regardless of sorting method
			// if it exists
			const dateA = new Date(a.items[0]?.frontmatter?.date || 0);
			const dateB = new Date(b.items[0]?.frontmatter?.date || 0);
			return dateB - dateA;
		});
	}

	// Processing generalforsamlinger
	if (slug.includes(GENERALFORSAMLINGER_FOLDER)) {
		label = trimGeneralforsamlingerDirectoryLabel(label);
		childDirectories = groupGeneralforsamlinger(childDirectories);
	}

	const items = [indexFile ?? [], ...childDirectories, ...files].flat();

	return [{ label, collapsed: true, items }];
};
