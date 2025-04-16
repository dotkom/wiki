const MAX_RECENT_FILES = 3;

export const groupGeneralforsamlinger = (files) => {
	if (!files?.length) {
		return [];
	}

	const recent = files.slice(0, MAX_RECENT_FILES);
	const older = files.slice(MAX_RECENT_FILES);

	if (older.length > 0) {
		recent.push({
			label: "Tidligere generalforsamlinger",
			items: older,
			collapsed: true,
		});
	}

	return recent;
};
