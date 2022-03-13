import React from "react";
import {
	createStyles,
	Text,
	Container,
	ActionIcon,
	Group,
} from "@mantine/core";
import { BsTwitter, BsYoutube, BsGithub } from "react-icons/bs";
import Logo from "@components/Logo";
import { FOOTER_LINKS } from "@config/footer";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
	footer: {
		paddingTop: theme.spacing.xl * 2,
		paddingBottom: theme.spacing.xl * 2,
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[6]
				: theme.colors.gray[0],
		borderTop: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
		}`,
	},

	logo: {
		maxWidth: 200,

		[theme.fn.smallerThan("sm")]: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
	},

	description: {
		marginTop: 5,

		[theme.fn.smallerThan("sm")]: {
			marginTop: theme.spacing.xs,
			textAlign: "center",
		},
	},

	inner: {
		display: "flex",
		justifyContent: "space-between",

		[theme.fn.smallerThan("sm")]: {
			flexDirection: "column",
			alignItems: "center",
		},
	},

	groups: {
		display: "flex",
		flexWrap: "wrap",

		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},

	wrapper: {
		width: 160,
	},

	link: {
		display: "block",
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[1]
				: theme.colors.gray[6],
		fontSize: theme.fontSizes.sm,
		paddingTop: 3,
		paddingBottom: 3,

		"&:hover": {
			textDecoration: "underline",
		},
	},

	title: {
		fontSize: theme.fontSizes.lg,
		fontWeight: 700,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		marginBottom: theme.spacing.xs / 2,
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
	},

	afterFooter: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: theme.spacing.xl,
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,
		borderTop: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
		}`,

		[theme.fn.smallerThan("sm")]: {
			flexDirection: "column",
		},
	},

	social: {
		[theme.fn.smallerThan("sm")]: {
			marginTop: theme.spacing.xs,
		},
	},
}));

const Footer = () => {
	const { classes } = useStyles();
	const groups = FOOTER_LINKS.map((group) => {
		const links = group.links.map((link, index) => (
			<Link key={index} href={link.link} passHref>
				<a className={classes.link} component="a">
					{link.label}
				</a>
			</Link>
		));

		return (
			<div className={classes.wrapper} key={group.title}>
				<Text className={classes.title}>{group.title}</Text>
				{links}
			</div>
		);
	});
	return (
		<footer className={classes.footer}>
			<Container className={classes.inner}>
				<div className={classes.logo}>
					<Logo />
					<Text size="xs" color="dimmed" className={classes.description}>
						Book train tickets, easier than ever.
					</Text>
				</div>
				<div className={classes.groups}>{groups}</div>
			</Container>
			<Container className={classes.afterFooter}>
				<Text color="dimmed" size="sm">
					© 2022 GoTrip. All rights reserved.
				</Text>

				<Group spacing={0} className={classes.social} position="right" noWrap>
					<ActionIcon size="lg">
						<BsTwitter size={18} />
					</ActionIcon>
					<ActionIcon
						size="lg"
						onClick={() => {
							window.open(
								"https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=4s",
								"_blank"
							);
						}}
					>
						<BsYoutube size={18} />
					</ActionIcon>
					<ActionIcon
						size="lg"
						onClick={() => {
							window.open("https://www.github.com/sahrohit/gotrip", "_blank");
						}}
					>
						<BsGithub size={18} />
					</ActionIcon>
				</Group>
			</Container>
		</footer>
	);
};

export default Footer;
