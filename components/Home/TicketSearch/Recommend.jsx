import { RECOMMENDED } from "@config/recommend";
import { BackgroundImage, Center, Group, Box, Text } from "@mantine/core";
import { nanoid } from "nanoid";
import React from "react";
import { useViewportSize } from "@mantine/hooks";

const RANDOMIZED_SELECTION = RECOMMENDED.sort(() => 0.5 - Math.random());

const Recommend = ({ setToStation }) => {
	const { width } = useViewportSize();

	return (
		<Group
			direction="row"
			position="apart"
			sx={(theme) => ({
				width: "100%",
				marginTop: theme.spacing.md,
				marginBottom: theme.spacing.md,
			})}
		>
			{RANDOMIZED_SELECTION.slice(
				0,
				(width > 600 && width < 990) || width > 1285 ? 3 : 2
			).map((item) => (
				<Box
					key={nanoid()}
					sx={{ maxWidth: 180 }}
					mx="auto"
					onClick={() => setToStation(item.to_station_code)}
				>
					<BackgroundImage
						src={item.imageURL}
						radius="sm"
						sx={(theme) => ({
							minHeight: 270,
							filter: `blur(0.2px)`,
						})}
					>
						<Center p="md">
							<Text
								color="#fff"
								sx={(theme) => ({
									fontSize: theme.fontSizes.xl,
									fontWeight: "semi-bold",
								})}
							>
								{item.text}
							</Text>
						</Center>
						<Center p="md">
							<Text
								color="#fff"
								sx={(theme) => ({
									fontSize: theme.fontSizes.xl * 1.8,
									fontWeight: "bold",
									filter: `blur(0.3px) brightness(1)`,
								})}
							>
								{item.heading}
							</Text>
						</Center>
					</BackgroundImage>
				</Box>
			))}
		</Group>
	);
};

export default Recommend;
