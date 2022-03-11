import React from "react";
import {
	createStyles,
	Table,
	Progress,
	Anchor,
	Text,
	Group,
	ScrollArea,
	Container,
	Center,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
	progressBar: {
		"&:not(:first-of-type)": {
			borderLeft: `3px solid ${
				theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
			}`,
		},
	},
}));

const AllTrains = () => {
	const { classes, theme } = useStyles();

	const data = [
		{
			title: "Hello",
			year: 1990,
			author: "Прибытие",
			reviews: {
				positive: 10,
				negative: 5,
			},
		},
		{
			title: "Hello",
			year: 1990,
			author: "Прибытие",
			reviews: {
				positive: 10,
				negative: 5,
			},
		},
		{
			title: "Hello",
			year: 1990,
			author: "Прибытие",
			reviews: {
				positive: 10,
				negative: 5,
			},
		},
		{
			title: "Hello",
			year: 1990,
			author: "Прибытие",
			reviews: {
				positive: 10,
				negative: 5,
			},
		},
		{
			title: "Hello",
			year: 1990,
			author: "Прибытие",
			reviews: {
				positive: 10,
				negative: 5,
			},
		},
		{
			title: "Hello",
			year: 1990,
			author: "Прибытие",
			reviews: {
				positive: 10,
				negative: 5,
			},
		},
		{
			title: "Hello",
			year: 1990,
			author: "Прибытие",
			reviews: {
				positive: 10,
				negative: 5,
			},
		},
		{
			title: "Hello",
			year: 1990,
			author: "Прибытие",
			reviews: {
				positive: 10,
				negative: 5,
			},
		},
		{
			title: "Hello",
			year: 1990,
			author: "Прибытие",
			reviews: {
				positive: 10,
				negative: 5,
			},
		},
		{
			title: "Hello",
			year: 1990,
			author: "Прибытие",
			reviews: {
				positive: 10,
				negative: 5,
			},
		},
		{
			title: "Hello",
			year: 1990,
			author: "Прибытие",
			reviews: {
				positive: 10,
				negative: 5,
			},
		},
		{
			title: "Hello",
			year: 1990,
			author: "Прибытие",
			reviews: {
				positive: 10,
				negative: 5,
			},
		},
		{
			title: "Hello",
			year: 1990,
			author: "Прибытие",
			reviews: {
				positive: 10,
				negative: 5,
			},
		},
		{
			title: "Hello",
			year: 1990,
			author: "Прибытие",
			reviews: {
				positive: 10,
				negative: 5,
			},
		},
		{
			title: "Hello",
			year: 1990,
			author: "Прибытие",
			reviews: {
				positive: 10,
				negative: 5,
			},
		},
		{
			title: "Hello",
			year: 1990,
			author: "Прибытие",
			reviews: {
				positive: 10,
				negative: 5,
			},
		},
	];

	const rows = data.map((row) => {
		const totalReviews = row.reviews.negative + row.reviews.positive;
		const positiveReviews = (row.reviews.positive / totalReviews) * 100;
		const negativeReviews = (row.reviews.negative / totalReviews) * 100;

		return (
			<tr key={row.title}>
				<td>
					<Anchor
						component="a"
						size="sm"
						onClick={(event) => event.preventDefault()}
					>
						{row.title}
					</Anchor>
				</td>
				<td>{row.year}</td>
				<td>
					<Anchor
						component="a"
						size="sm"
						onClick={(event) => event.preventDefault()}
					>
						{row.author}
					</Anchor>
				</td>
				<td>{Intl.NumberFormat().format(totalReviews)}</td>
				<td>
					<Group position="apart">
						<Text size="xs" color="teal" weight={700}>
							{positiveReviews.toFixed(0)}%
						</Text>
						<Text size="xs" color="red" weight={700}>
							{negativeReviews.toFixed(0)}%
						</Text>
					</Group>
					<Progress
						classNames={{ bar: classes.progressBar }}
						sections={[
							{
								value: positiveReviews,
								color:
									theme.colorScheme === "dark"
										? theme.colors.teal[9]
										: theme.colors.teal[6],
							},
							{
								value: negativeReviews,
								color:
									theme.colorScheme === "dark"
										? theme.colors.red[9]
										: theme.colors.red[6],
							},
						]}
					/>
				</td>
				<td>Hello</td>
			</tr>
		);
	});

	return (
		<Container fluid>
			<Center>
				<Text>Heading</Text>
			</Center>
			<ScrollArea
				sx={(theme) => ({
					border: `1px solid ${theme.colors.gray[7]}`,
					borderRadius: theme.radius.md,
				})}
			>
				<Table sx={{ minWidth: 800 }} verticalSpacing="xs">
					<thead>
						<tr>
							<th>From Station</th>
							<th>To Station</th>
							<th>Train Name</th>
							<th>Train Number</th>
							<th>Arrival</th>
							<th>Departure</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
			</ScrollArea>
		</Container>
	);
};

export default AllTrains;
