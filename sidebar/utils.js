import fs from "node:fs";
import matter from "gray-matter";

export const readFile = (filePath) => {
	if (!fs.existsSync(filePath)) {
		return null;
	}

	return fs.readFileSync(filePath, "utf-8");
};

export const getFrontmatter = (content, key) => (content ? matter(content).data[key] : {});

export const getIndexFileContent = (path, indexFileNames) => {
	for (const index of indexFileNames) {
		const indexFilePath = `${path}/${index}`;
		const indexFileContent = readFile(indexFilePath);

		if (indexFileContent) {
			return indexFileContent;
		}
	}

	return null;
};

export const removeFileExtension = (fileName) => {
	const fileExtension = fileName.split(".").pop();

	return fileName.replace(`.${fileExtension}`, "");
};
