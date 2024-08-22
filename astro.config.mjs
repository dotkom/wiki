import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import fs from "node:fs";

const roots = fs
	.readdirSync("src/content/docs")
	.filter((v) => [".DS_Store", "index.md"].indexOf(v) === -1);

// https://astro.build/config
export default defineConfig({
	site: "https://wiki.online.ntnu.no",
	integrations: [
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
                        defer: true,
                        "data-domain": "wiki.online.ntnu.no",
                        src: "https://plausible.io/js/script.outbound-links.file-downloads.js",
                    }
                }
            ],
			sidebar: [
				{
					label: "Online",
					link: "/",
				},
				...roots.map((root) => {
					return {
						label: root,
						collapsed: true,
						autogenerate: { directory: root },
					};
				}),
			],
		}),
	],
});
