const JULY = 6;
const FIFTEENTH = 15;

export const groupHsMeetings = (filesWithFrontmatter) => {
    const groups = filesWithFrontmatter.reduce(
        (acc, file) => {
            const rawDate = file.frontmatter?.date ?? 0;

            if (!rawDate) {
                acc.other.push(file);

                return acc;
            }

            const date = new Date(rawDate);
            const cutoff = new Date(date);
            cutoff.setMonth(JULY, FIFTEENTH);

            if (date > cutoff) {
                acc.autumn.push(file);
            } else {
                acc.spring.push(file);
            }

            return acc;
        },
        { autumn: [], spring: [], other: [] }
    );

    const groupedFiles = [];

    if (groups.autumn.length > 0) {
        groupedFiles.push({
            label: "Høst",
            items: groups.autumn.map((f) => f.item),
            collapsed: false,
        });
    }

    if (groups.spring.length > 0) {
        groupedFiles.push({
            label: "Vår",
            items: groups.spring.map((f) => f.item),
            collapsed: false,
        });
    }

    if (groups.other.length > 0) {
        groupedFiles.push({
            label: "Andre",
            items: groups.other.map((f) => f.item),
            collapsed: false,
        });
    }

    return groupedFiles;
};
