import { Button, Text } from "@mantine/core";
import React from "react";
import { useAuth } from "@contexts/AuthContext";
import to from "@components/helpers/to";
import { useNotifications } from "@mantine/notifications";

const dashboard = () => {
	const { logOut, currentUser } = useAuth();
	const notifications = useNotifications();

	return (
		<>
			<Text>{JSON.stringify(currentU1ser)}</Text>
			<Button
				color={"red"}
				onClick={async () => {
					const [data, error] = await to(
						logOut(),
						notifications,
						"Logged Out Successfully",
						"An Error Occured"
					);
					console.log(data);
					console.log(error);
				}}
			>
				Logout
			</Button>
		</>
	);
};

export default dashboard;
