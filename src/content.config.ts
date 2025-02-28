import { defineCollection } from "astro:content";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";
import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders";

export const collections = {
	docs: defineCollection({ schema: docsSchema(), loader: docsLoader() }),
	i18n: defineCollection({ schema: i18nSchema(), loader: i18nLoader()  }),
};
