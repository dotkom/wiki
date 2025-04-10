import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { getSidebar } from "./sidebar/getSidebar";

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
				{
					tag: "script",
					attrs: {
						type: "application/ld+json",
					},
					content: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebSite",
						"name": "Linjeforeningen Onlines Wiki",
						"alternateName": "Online Wiki",
						"url": "https://wiki.online.ntnu.no",
					}),
				},
				{
					tag: "link",
					attrs: {
						rel: "icon",
						href: "/images/icon-256.png",
						sizes: "256x256",
					},
				},
			],
			// Makes it so not everything is in one folder
			sidebar: getSidebar()[0].items,
		}),
	],
});
