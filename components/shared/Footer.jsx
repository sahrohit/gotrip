import React from "react";
import {
	createStyles,
	Anchor,
	Group,
	UnstyledButton,
	Box,
} from "@mantine/core";
import Logo from "@components/Logo";
import { BsGithub, BsTwitter } from "react-icons/bs";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
	socialButton: {
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[1]
				: theme.colors.gray[5],
		borderRadius: theme.radius.sm,
		padding: 5,

		"&:hover": {
			color: theme.colorScheme === "dark" ? theme.white : theme.black,
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},

		"& > svg": {
			display: "block",
			width: 18,
			height: 18,
		},
	},

	links: {
		[theme.fn.smallerThan("sm")]: {
			marginTop: theme.spacing.lg,
			marginBottom: theme.spacing.sm,
		},
	},
}));

const Footer = ({ links }) => {
	const { classes } = useStyles();

	return (
		<Box
			sx={(theme) => ({
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

				[theme.fn.smallerThan("sm")]: {
					flexDirection: "column",
				},
			})}
		>
			<Logo />

			<Group className={classes.links}>
				{LINKS.map((link) => (
					<Link key={link.label} href={link.link} passHref>
						<Anchor color="dimmed" sx={{ lineHeight: 1 }} size="sm">
							{link.label}
						</Anchor>
					</Link>
				))}
			</Group>

			<Group spacing={5}>
				<UnstyledButton color="dimmed" className={classes.socialButton}>
					<BsGithub />
				</UnstyledButton>
				<UnstyledButton color="dimmed" className={classes.socialButton}>
					<BsTwitter />
				</UnstyledButton>
			</Group>
		</Box>
	);
};

const LINKS = [
	{
		label: "About",
		link: "/about",
	},
	{
		label: "Blog",
		link: "/blog",
	},
	{
		label: "Contact",
		link: "/contact",
	},
	{
		label: "Privacy",
		link: "/privacy",
	},
];

export default Footer;
