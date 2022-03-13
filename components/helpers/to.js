import { BsCheck2, BsX } from "react-icons/bs";

const to = async (promise, notification, successMessage, errorMessage) => {
	try {
		const data = await promise;
		if (notification && successMessage) {
			notification.showNotification({
				radius: "md",
				icon: <BsCheck2 size={18} />,
				color: "teal",
				title: "Success",
				message: successMessage,
			});
		}
		return [data, null];
	} catch (error) {
		if (notification && errorMessage) {
			notification.showNotification({
				radius: "md",
				icon: <BsX size={18} />,
				color: "red",
				title: "An Error Occured",
				message: error.message || errorMessage,
			});
		}
		return [null, error];
	}
};

export default to;
