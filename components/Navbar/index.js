import React from "react";
import {
	createStyles,
	Header,
	Container,
	Group,
	Button,
	Burger,
	Box,
	Drawer,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import Logo from "@components/Logo";
import Link from "next/link";
import DrawerContent from "./DrawerContent";
import { BiHome } from "react-icons/bi";
import { useRouter } from "next/router";
import { useAuth } from "@contexts/AuthContext";
import { NAVBAR_LINKS as LINKS } from "@config/navbar";

const HEADER_HEIGHT = 56;

const useStyles = createStyles((theme) => ({
	inner: {
		height: HEADER_HEIGHT,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},

	links: {
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},

	burger: {
		[theme.fn.largerThan("sm")]: {
			display: "none",
		},
	},

	link: {
		display: "block",
		lineHeight: 1,
		padding: "8px 12px",
		borderRadius: theme.radius.sm,
		textDecoration: "none",
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},

	linkActive: {
		"&, &:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
					: theme.colors[theme.primaryColor][0],
			color:
				theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 3 : 7],
		},
	},

	linkLabel: {
		marginRight: 5,
	},
}));

export function Navbar() {
	const router = useRouter();
	const { classes, cx } = useStyles();
	const { setAuthModalOpened } = useAuth();
	const [opened, toggleOpened] = useBooleanToggle(false);

	const items = LINKS.map((link) => {
		return (
			<Link key={link.label} href={link.link}>
				<a
					className={cx(classes.link, {
						[classes.linkActive]: router.pathname === link.link,
					})}
				>
					{link.label}
				</a>
			</Link>
		);
	});

	return (
		<Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={20}>
			<Container className={classes.inner} fluid>
				<Group>
					<Box
						sx={(theme) => ({
							[theme.fn.largerThan("sm")]: {
								display: "none",
							},
						})}
					>
						<Burger opened={opened} onClick={() => toggleOpened()} size="sm" />
						<Drawer
							opened={opened}
							onClose={() => toggleOpened(false)}
							size="md"
							hideCloseButton={true}
						>
							<DrawerContent
								burgerOpened={opened}
								toggleOpened={toggleOpened}
								LINKS={LINKS}
							/>
						</Drawer>
					</Box>
					<Logo />
				</Group>
				<Group spacing={5} className={classes.links}>
					{items}
				</Group>
				<Button
					radius="xl"
					sx={{ height: 36 }}
					onClick={() => setAuthModalOpened(true)}
				>
					Login / Register
				</Button>
			</Container>
		</Header>
	);
}
