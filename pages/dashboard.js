import { Button, Text, Group, Box, ScrollArea } from "@mantine/core";
import React from "react";
import { useAuth } from "@contexts/AuthContext";
import to from "@components/helpers/to";
import { useNotifications } from "@mantine/notifications";
import VerifiedUser from "@components/Routes/VerifiedUser";
import ProfilePanel from "@components/Dashboard/ProfilePanel";
import Bookings from "@components/Dashboard/Bookings";

const Dashboard = () => {
	const { currentUser } = useAuth();

	return (
		<VerifiedUser>
			<Group
				direction="row"
				noWrap="true"
				sx={(theme) => ({
					width: "100%",
					height: "100vh",
					justifyContent: "space-around",
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
				<ScrollArea style={{ height: "100vh" }}>
					<Bookings />
				</ScrollArea>
			</Group>
		</VerifiedUser>
	);
};

export default Dashboard;
