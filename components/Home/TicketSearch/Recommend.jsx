import { Container, Group, Box, Text, createStyles } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { RecommendedCard } from "./RecommendedCard";

const useStyles = createStyles((theme) => {
	return {
		card: {
			width: "30%",
			height: "200px",
			backgroundColor: "red",
		},
	};
});

const Recommend = () => {
	const { classes } = useStyles();

	return (
		<Group direction="row" position="apart">
			<Box className={classes.card}>.</Box>
			<Box className={classes.card}>.</Box>
			<Box className={classes.card}>.</Box>
		</Group>
	);
};

export default Recommend;
