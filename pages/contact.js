import React from "react";
import {
	createStyles,
	Text,
	Title,
	SimpleGrid,
	TextInput,
	Textarea,
	Button,
	Group,
	ActionIcon,
	Container,
} from "@mantine/core";
import { BsTwitter, BsYoutube, BsInstagram } from "react-icons/bs";
import { ContactIconsList } from "@components/ContactUs/ContactIcons";
import { Navbar } from "@components/Navbar";

const useStyles = createStyles((theme) => ({
	wrapper: {
		minHeight: 400,
		boxSizing: "border-box",
		backgroundImage: `linear-gradient(-60deg, ${
			theme.colors[theme.primaryColor][4]
		} 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
		borderRadius: theme.radius.md,
		padding: theme.spacing.xl * 2.5,

		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			padding: theme.spacing.xl * 1.5,
		},
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		color: theme.white,
		lineHeight: 1,
	},

	description: {
		color: theme.colors[theme.primaryColor][0],
		maxWidth: 300,

		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			maxWidth: "100%",
		},
	},

	form: {
		backgroundColor: theme.white,
		padding: theme.spacing.xl,
		borderRadius: theme.radius.md,
		boxShadow: theme.shadows.lg,
	},

	social: {
		color: theme.white,

		"&:hover": {
			color: theme.colors[theme.primaryColor][1],
		},
	},

	input: {
		backgroundColor: theme.white,
		borderColor: theme.colors.gray[4],
		color: theme.black,

		"&::placeholder": {
			color: theme.colors.gray[5],
		},
	},

	inputLabel: {
		color: theme.black,
	},

	control: {
		backgroundColor: theme.colors[theme.primaryColor][6],
	},
}));

const social = [
	{ icon: BsTwitter, href: "https://twitter.com/pewdiepie" },
	{ icon: BsYoutube, href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
	{ icon: BsInstagram, href: "https://www.github.com/sahrohit/gotrip" },
];

const ContactUs = () => {
	const { classes } = useStyles();

	const icons = social.map((item, index) => (
		<ActionIcon
			key={index}
			size={28}
			className={classes.social}
			variant="transparent"
			onClick={() => {
				window.open(item.href, "_blank");
			}}
		>
			<item.icon size={22} />
		</ActionIcon>
	));

	return (
		<>
			<Navbar />
			<Container
				sx={(theme) => ({
					height: "80vh",
					display: "grid",
					placeItems: "center",
				})}
			>
				<div className={classes.wrapper}>
					<SimpleGrid
						cols={2}
						spacing={50}
						breakpoints={[{ maxWidth: "sm", cols: 1 }]}
					>
						<div>
							<Title className={classes.title}>Contact us</Title>
							<Text className={classes.description} mt="sm" mb={30}>
								Leave your email and we will get back to you within 24 hours
							</Text>

							<ContactIconsList variant="white" />

							<Group mt="xl">{icons}</Group>
						</div>
						<div className={classes.form}>
							<TextInput
								label="Email"
								placeholder="your@email.com"
								required
								classNames={{ input: classes.input, label: classes.inputLabel }}
							/>
							<TextInput
								label="Name"
								placeholder="Joe Mama"
								mt="md"
								classNames={{ input: classes.input, label: classes.inputLabel }}
							/>
							<Textarea
								required
								label="Your message"
								placeholder="E.g. I had problem with my ticket."
								minRows={4}
								mt="md"
								classNames={{ input: classes.input, label: classes.inputLabel }}
							/>

							<Group position="right" mt="md">
								<Button className={classes.control}>Send message</Button>
							</Group>
						</div>
					</SimpleGrid>
				</div>
			</Container>
		</>
	);
};

export default ContactUs;
