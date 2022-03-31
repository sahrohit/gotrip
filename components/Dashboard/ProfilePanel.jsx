import { useAuth } from "@contexts/AuthContext";
import { Avatar, Text, Button, Paper } from "@mantine/core";
import to from "@components/helpers/to";
import { useNotifications } from "@mantine/notifications";

const ProfilePanel = () => {
	const { logOut, currentUser } = useAuth();
	const notifications = useNotifications();

	return (
		<Paper
			radius="md"
			withBorder
			p="lg"
			sx={(theme) => ({
				backgroundColor:
					theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
			})}
		>
			<Avatar src={currentUser.photoURL} size={120} radius={120} mx="auto" />
			<Text align="center" size="lg" weight={500} mt="md">
				{currentUser.displayName}
			</Text>
			<Text align="center" color="dimmed" size="sm">
				{currentUser.email}
			</Text>

			<Button
				fullWidth
				color="red"
				mt="md"
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
		</Paper>
	);
};

export default ProfilePanel;
