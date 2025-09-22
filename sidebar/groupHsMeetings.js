const JULY = 6;
const FIFTEENTH = 15;

export const groupHsMeetings = (files) => {
  const groups = files.reduce(
    (acc, file) => {
      const rawDate = file.meta.frontmatter?.date ?? 0;

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
      items: groups.autumn,
      collapsed: false,
    });
  }

  if (groups.spring.length > 0) {
    groupedFiles.push({
      label: "Vår",
      items: groups.spring,
      collapsed: false,
    });
  }

  if (groups.other.length > 0) {
    groupedFiles.push({
      label: "Andre",
      items: groups.other,
      collapsed: false,
    });
  }

  return groupedFiles;
};
