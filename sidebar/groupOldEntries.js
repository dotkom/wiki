export const groupOldEntries = (files, count, label) => {
  if (!files?.length) {
    return [];
  }

  const recent = files.slice(0, count);
  const older = files.slice(count);

  if (older.length > 0) {
    recent.push({
      label,
      items: older,
      collapsed: true,
    });
  }

  return recent;
};
