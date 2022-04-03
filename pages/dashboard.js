import React from "react";
import { Group, Box, ScrollArea, Center, Text } from "@mantine/core";
import VerifiedUser from "@components/Routes/VerifiedUser";
import ProfilePanel from "@components/Dashboard/ProfilePanel";
import Bookings from "@components/Dashboard/Bookings";
import { Navbar } from "@components/Navbar";

const Dashboard = () => {
	return (
		<VerifiedUser>
			<Navbar />
			<Group
				direction="row"
				noWrap="true"
				sx={(theme) => ({
					width: "100%",
					height: "80vh",
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
				<Box>
					<Center my={20}>
						<Text
							sx={(theme) => ({
								fontSize: 2 * theme.fontSizes.xl,
							})}
						>
							Bookings
						</Text>
					</Center>
					<ScrollArea style={{ height: "80vh" }}>
						<Bookings />
					</ScrollArea>
				</Box>
			</Group>
		</VerifiedUser>
	);
};

export default Dashboard;
