import { Button, Text } from "@mantine/core";
import React from "react";
import { useAuth } from "@contexts/AuthContext";
import to from "@components/helpers/to";
import { useNotifications } from "@mantine/notifications";
import VerifiedUser from "@components/Routes/VerifiedUser";

const dashboard = () => {
	const { logOut, currentUser } = useAuth();
	const notifications = useNotifications();

	return (
		<VerifiedUser>
			<Text>{JSON.stringify(currentUser)}</Text>
			<Button
				color={"red"}
				onClick={async () => {
					const [data, error] = await to(
						logOut(),
						notifications,
						"Logged Out Successfully",
						"An Error Occured"
					);
				}}
			>
				Logout
			</Button>
		</VerifiedUser>
	);
};

export default dashboard;
