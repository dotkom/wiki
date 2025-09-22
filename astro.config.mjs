import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { getSidebar } from "./sidebar/getSidebar";
import starlightLinksValidator from "starlight-links-validator";

// Removes any "meta" objects used to generate the sidebar
const sanitizeSidebar = (nodes) => {
    return nodes.reduce((acc, node) => {
        const { meta, ...sanitizedNode } = node;

        if (meta?.empty) {
            return acc;
        }

        if (Array.isArray(sanitizedNode.items)) {
            sanitizedNode.items = sanitizeSidebar(sanitizedNode.items);
        }

        acc.push(sanitizedNode);
        return acc;
    }, []);
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
            lastUpdated: true,
            customCss: ["./src/styles/custom.css"],
            editLink: { baseUrl: "https://github.com/dotkom/wiki/edit/main/" },
            social: [
                { icon: "facebook", label: "Facebook", href: "https://facebook.com/LinjeforeningenOnline" },
                { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/online_ntnu/" },
                { icon: "slack", label: "Slack", href: "https://onlinentnu.slack.com/" },
                { icon: "github", label: "GitHub", href: "https://github.com/dotkom/wiki" },
                { icon: "discord", label: "Discord", href: "https://discordapp.com/invite/2XB9egU" },
            ],
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
                {
                    tag: "meta",
                    attrs: {
                        name: "application-name",
                        content: "Online Wiki",
                    },
                },
            ],
            // Makes it so not everything is in one folder
            sidebar: sanitizeSidebar(getSidebar()[0].items),
            plugins: [
                starlightLinksValidator({
                    errorOnRelativeLinks: false,
                    errorOnInvalidHashes: false,
                }),
            ],
        }),
    ],
});
