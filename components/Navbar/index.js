import React from "react";
import Link from "next/link";

import { useBooleanToggle } from "@mantine/hooks";
import { Header, Group, Burger, Text, Drawer, Box } from "@mantine/core";
import { BiHome } from "react-icons/bi";

import ToggleTheme from "@components/shared/ToggleTheme";
import DrawerContent from "./DrawerContent";

const LINKS = [
	{
		label: "Home",
		link: "/",
		icon: BiHome,
	},
	{
		label: "About",
		link: "/about",
		icon: BiHome,
	},
	{
		label: "Contact",
		link: "/contact",
		icon: BiHome,
	},
];

export function Navbar() {
	const [opened, toggleOpened] = useBooleanToggle(false);

	return (
		<Header
			height={56}
			sx={(theme) => ({
				paddingLeft: theme.spacing.md,
				paddingRight: theme.spacing.md,
				marginBottom: theme.spacing.xl * 2,
			})}
		>
			<Box
				sx={(theme) => ({
					height: 56,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				})}
			>
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

				<Text>Logo</Text>

				<Group
					sx={(theme) => ({
						[theme.fn.smallerThan("sm")]: {
							display: "none",
						},
					})}
				>
					{LINKS.map((link) => (
						<Link href={link.link} key={link.label} passHref>
							<Group
								noWrap={true}
								direction="row"
								sx={(theme) => ({
									lineHeight: 1,
									padding: "6px 12px",
									borderRadius: theme.radius.sm,
									"&:hover": {
										backgroundColor:
											theme.colorScheme === "dark"
												? theme.colors.dark[5]
												: theme.colors.gray[3],
									},
								})}
							>
								<link.icon fontSize={"18"} />
								<Text
									sx={(theme) => ({
										fontSize: theme.fontSizes.lg,
										color:
											theme.colorScheme === "dark"
												? theme.colors.dark[0]
												: theme.colors.gray[7],
									})}
								>
									{link.label}
								</Text>
							</Group>
						</Link>
					))}
				</Group>
				<ToggleTheme />
			</Box>
		</Header>
	);
}
