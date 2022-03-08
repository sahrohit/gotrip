import React from "react";
import {
	Title,
	Text,
	Container,
	Button,
	Overlay,
	createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
	wrapper: {
		position: "relative",
		paddingTop: 180,
		paddingBottom: 130,
		backgroundImage:
			"url(https://images.unsplash.com/photo-1565900290200-52daa0c9faec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80)",
		backgroundSize: "cover",
		backgroundPosition: "center",

		"@media (max-width: 520px)": {
			paddingTop: 80,
			paddingBottom: 50,
		},
	},

	inner: {
		position: "relative",
		zIndex: 1,
	},

	title: {
		fontWeight: 800,
		fontSize: 40,
		letterSpacing: -1,
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		color: theme.white,
		marginBottom: theme.spacing.xs,
		textAlign: "center",
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,

		"@media (max-width: 520px)": {
			fontSize: 28,
			textAlign: "left",
		},
	},

	highlight: {
		color: theme.colors[theme.primaryColor][4],
	},

	description: {
		color: theme.colors.gray[0],
		textAlign: "center",

		"@media (max-width: 520px)": {
			fontSize: theme.fontSizes.md,
			textAlign: "left",
		},
	},

	controls: {
		marginTop: theme.spacing.xl * 1.5,
		display: "flex",
		justifyContent: "center",
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,

		"@media (max-width: 520px)": {
			flexDirection: "column",
		},
	},

	control: {
		height: 42,
		fontSize: theme.fontSizes.md,

		"&:not(:first-of-type)": {
			marginLeft: theme.spacing.md,
		},

		"@media (max-width: 520px)": {
			"&:not(:first-of-type)": {
				marginTop: theme.spacing.md,
				marginLeft: 0,
			},
		},
	},
}));

const BookNowComponent = () => {
	const { classes, cx } = useStyles();

	return (
		<div className={classes.wrapper}>
			<Overlay color="#000" opacity={0.65} zIndex={1} />

			<div className={classes.inner}>
				<Title className={classes.title}>
					Tickets from{" "}
					<Text component="span" inherit className={classes.highlight}>
						anywhere{" "}
					</Text>
					to{" "}
					<Text component="span" inherit className={classes.highlight}>
						anywhere
					</Text>
				</Title>

				<Container size={640}>
					<Text size="lg" className={classes.description}>
						Book ticket from any device, any time. Let GoTrip worry about
						getting the cheapest and the best experinece for you.
					</Text>
				</Container>

				<div className={classes.controls}>
					<Button variant="white" size="md">
						Book Now
					</Button>
				</div>
			</div>
		</div>
	);
};

export default BookNowComponent;
