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
	Menu,
	ActionIcon,
	Divider,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import Logo from "@components/Logo";
import Link from "next/link";
import DrawerContent from "./DrawerContent";
import { BiHome } from "react-icons/bi";
import { useRouter } from "next/router";
import { useAuth } from "@contexts/AuthContext";
import { NAVBAR_LINKS as LINKS } from "@config/navbar";
import to from "@components/helpers/to";
import { useNotifications } from "@mantine/notifications";

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

	button: {
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	},

	menuControl: {
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		border: 0,
		borderLeft: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
		}`,
	},
}));

export function Navbar() {
	const router = useRouter();
	const { classes, cx, theme } = useStyles();
	const notifications = useNotifications();
	const menuIconColor =
		theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6];
	const { setAuthModalOpened, currentUser, logOut } = useAuth();
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
							withCloseButton={false}
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
				{currentUser ? (
					<Group noWrap spacing={0}>
						<Link href="/dashboard" passHref>
							<Button className={classes.button}>Dashboard</Button>
						</Link>
						<Menu
							control={
								<ActionIcon
									variant="filled"
									color={theme.primaryColor}
									size={36}
									className={classes.menuControl}
								>
									<BiHome size={16} />
								</ActionIcon>
							}
							transition="pop"
							placement="end"
						>
							<Menu.Item icon={<BiHome size={16} color={menuIconColor} />}>
								Schedule for later
							</Menu.Item>
							<Menu.Item icon={<BiHome size={16} color={menuIconColor} />}>
								Save draft
							</Menu.Item>
							<Menu.Item icon={<BiHome size={16} color={menuIconColor} />}>
								Delete
							</Menu.Item>
							<Divider />
							<Menu.Label>Danger zone</Menu.Label>
							<Menu.Item icon={<BiHome size={14} />}>
								Transfer my data
							</Menu.Item>

							<Menu.Item
								color="red"
								icon={<BiHome size={14} />}
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
							</Menu.Item>
						</Menu>
					</Group>
				) : (
					<Button
						radius="xl"
						sx={{ height: 36 }}
						onClick={() => setAuthModalOpened(true)}
					>
						Login / Register
					</Button>
				)}
			</Container>
		</Header>
	);
}
