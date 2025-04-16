const GENFORS_TITLE_REGEX = /Genfors \d{4}(?:\svår|høst)?(?:\s\(ekstraordinær(?:\s\d)?\))?/i;

export const trimGeneralforsamlingerDirectoryLabel = (directoryLabel) => {
	if (!GENFORS_TITLE_REGEX.test(directoryLabel)) {
		return directoryLabel;
	}

	return directoryLabel.slice("Genfors ".length);
};
