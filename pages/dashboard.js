import { Button, Text, Group, Box } from "@mantine/core";
import React from "react";
import { useAuth } from "@contexts/AuthContext";
import to from "@components/helpers/to";
import { useNotifications } from "@mantine/notifications";
import VerifiedUser from "@components/Routes/VerifiedUser";
import ProfilePanel from "@components/Dashboard/ProfilePanel";

const Dashboard = () => {
	const { logOut, currentUser } = useAuth();
	const notifications = useNotifications();

	return (
		<VerifiedUser>
			<Group
				direction="row"
				noWrap="true"
				sx={(theme) => ({
					width: "100%",
					height: "100vh",
				})}
			>
				<Box
					m="md"
					sx={(theme) => ({
						width: "25%",
					})}
				>
					<ProfilePanel />
				</Box>
				<Box
					sx={(theme) => ({
						width: "70%",
					})}
				>
					<Text noWrap="false">{"JSON.stringify(currentUser)"}</Text>
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
				</Box>
			</Group>
		</VerifiedUser>
	);
};

export default Dashboard;
