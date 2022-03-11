import React from "react";
import {
	createStyles,
	Image,
	Container,
	Title,
	Button,
	Group,
	Text,
	List,
	ThemeIcon,
} from "@mantine/core";
import { AiOutlineCheck } from "react-icons/ai";

const useStyles = createStyles((theme) => ({
	inner: {
		display: "flex",
		justifyContent: "space-between",
		paddingTop: theme.spacing.xl * 4,
		paddingBottom: theme.spacing.xl * 4,
	},

	content: {
		maxWidth: 480,
		marginRight: theme.spacing.xl * 3,

		[theme.fn.smallerThan("md")]: {
			maxWidth: "100%",
			marginRight: 0,
		},
	},

	title: {
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: 44,
		lineHeight: 1.2,
		fontWeight: 900,

		[theme.fn.smallerThan("xs")]: {
			fontSize: 28,
		},
	},

	control: {
		[theme.fn.smallerThan("xs")]: {
			flex: 1,
		},
	},

	image: {
		flex: 1,

		[theme.fn.smallerThan("md")]: {
			display: "none",
		},
	},

	highlight: {
		position: "relative",
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
				: theme.colors[theme.primaryColor][0],
		borderRadius: theme.radius.sm,
		padding: "4px 12px",
	},
}));

export function Banner() {
	const { classes } = useStyles();
	return (
		<div>
			<Container>
				<div className={classes.inner}>
					<div className={classes.content}>
						<Title className={classes.title}>
							A <span className={classes.highlight}>modern</span> Ticket Booking
							App
						</Title>
						<Text color="dimmed" mt="md">
							Build with love and passion. We keep customer expericence at the
							top of our priority. Buy tickets within minutes with hassle free
							cancellation and refund.
						</Text>

						<List
							mt={30}
							spacing="sm"
							size="sm"
							icon={
								<ThemeIcon size={20} radius="xl">
									<AiOutlineCheck size={12} />
								</ThemeIcon>
							}
						>
							<List.Item>
								<b>Fast and Reliable</b> – Book tickets within minutes with no
								hassle.
							</List.Item>
							<List.Item>
								<b>24/7 Customer Service</b> – Our customer service team is
								always on the call to help you.
							</List.Item>
							<List.Item>
								<b>Plan B</b> – If you ticket is modified from our end, you can
								reschedule or cancel it at no cost.
							</List.Item>
						</List>

						<Group mt={30}>
							<Button radius="xl" size="md" className={classes.control}>
								Book Now
							</Button>
						</Group>
					</div>
				</div>
			</Container>
		</div>
	);
}
