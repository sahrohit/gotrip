export const colorizeFromText = (text) => {
	switch (text) {
		case "confirmed":
			return "blue";

		case "cancelled":
			return "red";

		case "completed":
			return "green";

		default:
			return "purple";
	}
};
