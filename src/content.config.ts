import { defineCollection, z } from "astro:content";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";
import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders";

export const collections = {
    docs: defineCollection({
        schema: docsSchema({
            extend: z.object({
                "date": z.date().optional(),
                "child-directories-sort": z.enum(["asc", "desc", "date"]).optional(),
                "child-files-sort": z.enum(["asc", "desc", "date"]).optional(),
                "link": z.string().url().optional(),
            }),
        }),
        loader: docsLoader(),
    }),
    i18n: defineCollection({ schema: i18nSchema(), loader: i18nLoader() }),
};
