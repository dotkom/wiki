import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import fs from "node:fs";

const BOUNDRY_SLASHES_REGEX = /^\/|\/$/g;
const TITLE_REGEX = /^-{3}\r?\ntitle:\s(?<tick>["'`])(?<title>.+)\k<tick>\s*\r?\n/;

const BASE_PATH = "src/content/docs";

const getMarkdownFileContent = (filePath) => {
	if (!fs.existsSync(filePath)) {
		return null;
	}

	return fs.readFileSync(filePath, "utf-8");
};

const getTitle = (markdownFileContent) => {
	const match = markdownFileContent.match(TITLE_REGEX);

	return match?.groups?.title ?? null;
};

const getSidebar = (rawSlug = "", collapseFirst = false) => {
	const slug = rawSlug.replace(BOUNDRY_SLASHES_REGEX, "");
	const path = `${BASE_PATH}/${slug}`;

	const indexContent = getMarkdownFileContent(`${path}/index.md`);
	const label = indexContent ? getTitle(indexContent) : slug.split("/").pop();

	const index = indexContent ? { label, slug, badge: { text: "index", class: "badge" } } : [];

	const [files, directories] = fs.readdirSync(path).reduce(
		([files, directories], item) => {
			const itemPath = `${path}/${item}`;

			if (fs.lstatSync(itemPath).isDirectory()) {
				return [files, [...directories, item]];
			}

			if (item === "index.md" || !item.endsWith(".md")) {
				return [files, directories];
			}

			return [[...files, item], directories];
		},
		[[], []]
	);

	const parsedFiles = files.map((file) => {
		const content = getMarkdownFileContent(`${path}/${file}`);
		const title = getTitle(content);

		return { label: title, slug: `${slug}/${file.replace(".md", "")}` };
	});

	const children = directories.map((directory) => getSidebar(`${slug}/${directory}`, true));

	const items = [index, ...parsedFiles, ...children.flat()].flat();

	return [{ label, collapsed: collapseFirst, items }];
};

// https://astro.build/config
export default defineConfig({
	site: "https://wiki.online.ntnu.no",
	integrations: [
		// https://starlight.astro.build/reference/configuration/
		starlight({
			title: "Online Wiki",
			favicon: "/images/online_bla_o.svg",
			defaultLocale: "root",
			locales: {
				root: {
					label: "Norsk",
					lang: "no",
				},
				en: {
					label: "English",
				},
			},
			logo: {
				light: "./src/assets/img/online_bla_o.svg",
				dark: "./src/assets/img/online_hvit_o.svg",
			},
			components: {
				SocialIcons: "./src/components/BekkLogo.astro",
			},
			lastUpdated: true,
			customCss: ["./src/styles/custom.css"],
			editLink: { baseUrl: "https://github.com/dotkom/wiki/edit/main/" },

			social: {
				facebook: "https://facebook.com/LinjeforeningenOnline",
				instagram: "https://www.instagram.com/online_ntnu/",
				slack: "https://onlinentnu.slack.com/",
				github: "https://github.com/dotkom/wiki",
				discord: "https://discordapp.com/invite/2XB9egU",
			},
			head: [
				{
					tag: "script",
					attrs: {
						"defer": true,
						"data-domain": "wiki.online.ntnu.no",
						"src": "https://plausible.io/js/script.outbound-links.file-downloads.js",
					},
				},
			],
			sidebar: getSidebar(),
		}),
	],
});
