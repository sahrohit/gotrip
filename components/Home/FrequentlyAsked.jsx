import React from "react";
import { Container, Title, Accordion, createStyles } from "@mantine/core";

const FREQUENTLY_ASKED_QUESTIONS = [
	{
		question: "What is GoTrip?",
		answer: `GoTrip is you one stop soution for all your travel needs including tickets, hotels etc.`,
	},
	{
		question: "How do I register?",
		answer: `To sign up, click on the "Sign up" button on the top right corner of the page.`,
	},
	{
		question: "What payment solutions do we accept?",
		answer: `We accept most of the payment solution out there, a detaled list of our payment partners is stated in the footer.`,
	},
];

const useStyles = createStyles((theme, _params, getRef) => {
	const control = getRef("control");

	return {
		wrapper: {
			paddingTop: theme.spacing.xl * 2,
			paddingBottom: theme.spacing.xl * 2,
		},

		title: {
			fontWeight: 400,
			marginBottom: theme.spacing.xl * 1.5,
		},

		control: {
			ref: control,

			"&:hover": {
				backgroundColor: "transparent",
			},
		},

		item: {
			borderRadius: theme.radius.md,
			marginBottom: theme.spacing.lg,

			border: `1px solid ${
				theme.colorScheme === "dark"
					? theme.colors.dark[3]
					: theme.colors.gray[3]
			}`,
		},

		itemOpened: {
			[`& .${control}`]: {
				color: theme.colors["teal"][theme.colorScheme === "dark" ? 4 : 6],
			},
		},
	};
});

const FrequentlyAsked = () => {
	const { classes } = useStyles();
	return (
		<Container size="sm" className={classes.wrapper}>
			<Title align="center" className={classes.title}>
				Frequently Asked Questions
			</Title>

			<Accordion
				iconPosition="right"
				classNames={{
					item: classes.item,
					itemOpened: classes.itemOpened,
					control: classes.control,
				}}
			>
				{FREQUENTLY_ASKED_QUESTIONS.map((item, index) => (
					<Accordion.Item key={item.question} label={item.question}>
						{item.answer}
					</Accordion.Item>
				))}
			</Accordion>
		</Container>
	);
};

export default FrequentlyAsked;
