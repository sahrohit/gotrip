import React from "react";
import {
	UnstyledButton,
	Group,
	Avatar,
	Text,
	createStyles,
} from "@mantine/core";
import { BsCheck2 } from "react-icons/bs";
import { useAuth } from "@contexts/AuthContext";

const useStyles = createStyles((theme) => ({
	user: {
		display: "block",
		width: "100%",
		padding: theme.spacing.md,
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[8]
					: theme.colors.gray[0],
		},
	},
}));

export function DrawerUserProfile() {
	const { classes } = useStyles();
	const { currentUser } = useAuth();

	return (
		<UnstyledButton className={classes.user}>
			<Group direction="row" noWrap>
				<Avatar src={currentUser?.photoURL} radius="xl" />

				<div style={{ flex: 1 }}>
					<Text size="sm" weight={500}>
						{currentUser?.displayName}
					</Text>

					<Text color="dimmed" size="xs">
						{currentUser?.email}
					</Text>
				</div>
				<BsCheck2 size={14} />
			</Group>
		</UnstyledButton>
	);
}
