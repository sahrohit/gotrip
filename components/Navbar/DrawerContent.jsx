import React from "react";
import {
	Group,
	Text,
	Burger,
	Divider,
	Navbar,
	Box,
	createStyles,
} from "@mantine/core";
import Link from "next/link";
import { HiOutlineLogout } from "react-icons/hi";

const useStyles = createStyles((theme, _params, getRef) => {
	const icon = getRef("icon");

	return {
		link: {
			...theme.fn.focusStyles(),
			display: "flex",
			alignItems: "center",
			textDecoration: "none",
			fontSize: theme.fontSizes.sm,
			color:
				theme.colorScheme === "dark"
					? theme.colors.dark[1]
					: theme.colors.gray[7],
			padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
			borderRadius: theme.radius.md,
			fontWeight: 500,

			"&:hover": {
				backgroundColor:
					theme.colorScheme === "dark"
						? theme.colors.dark[8]
						: theme.colors.gray[0],
				color: theme.colorScheme === "dark" ? theme.white : theme.black,

				[`& .${icon}`]: {
					color: theme.colorScheme === "dark" ? theme.white : theme.black,
				},
			},
		},

		linkIcon: {
			ref: icon,
			color:
				theme.colorScheme === "dark"
					? theme.colors.dark[2]
					: theme.colors.gray[6],
			marginRight: theme.spacing.sm,
			fontSize: "22px",
		},

		linkActive: {
			"&, &:hover": {
				backgroundColor:
					theme.colorScheme === "dark"
						? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
						: theme.colors[theme.primaryColor][0],
				color:
					theme.colors[theme.primaryColor][
						theme.colorScheme === "dark" ? 4 : 7
					],
				[`& .${icon}`]: {
					color:
						theme.colors[theme.primaryColor][
							theme.colorScheme === "dark" ? 4 : 7
						],
				},
			},
		},
	};
});

const DrawerContent = ({ LINKS, toggleOpened, burgerOpened }) => {
	const { classes, cx } = useStyles();

	return (
		<Group
			direction="column"
			sx={(theme) => ({
				padding: theme.spacing.xl,
				height: "100%",
				justifyContent: "space-between",
			})}
		>
			<Group
				direction="column"
				sx={() => ({
					width: "100%",
				})}
			>
				<Group
					direction="row"
					position="apart"
					sx={() => ({
						width: "100%",
					})}
				>
					<Text
						sx={(theme) => ({
							fontSize: "24px",
							fontWeight: "semi-bold",
							color: theme.colorScheme === "dark" ? theme.white : theme.black,
						})}
					>
						Navigation
					</Text>
					<Burger
						opened={burgerOpened}
						onClick={() => toggleOpened()}
						title={"Close"}
					/>
				</Group>

				<Navbar.Section grow mt="xl" sx={() => ({ width: "100%" })}>
					{LINKS.map((item) => (
						<Link key={item.label} href={item.link} passHref>
							<Box
								className={cx(classes.link, {
									[classes.linkActive]: item.link === "/",
								})}
							>
								<item.icon className={classes.linkIcon} />
								<Text component="span">{item.label}</Text>
							</Box>
						</Link>
					))}
				</Navbar.Section>
			</Group>

			<Group direction="column" sx={() => ({ width: "100%" })}>
				
				<Divider sx={() => ({ width: "100%" })} />
				<Box
					sx={() => ({ width: "100%" })}
					className={cx(classes.link)}
					onClick={(event) => {
						event.preventDefault();
					}}
				>
					<HiOutlineLogout className={classes.linkIcon} />
					<Text component="span">Logout</Text>
				</Box>
			</Group>
		</Group>
	);
};

export default DrawerContent;
