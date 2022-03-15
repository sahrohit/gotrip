import React, { useState, useEffect } from "react";
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
	Button,
	Loader,
	Title,
	MultiSelect,
} from "@mantine/core";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import {
	query,
	getDocs,
	collection,
	where,
	orderBy,
	limit,
	startAfter,
} from "firebase/firestore";
import { useWindowScroll } from "@mantine/hooks";
import { db } from "../firebase";
import { nanoid } from "nanoid";
import { stations } from "@config/stations";

const useStyles = createStyles((theme) => ({
	multiselect: {
		root: {
			width: "200%",
			backgroundColor: "red",
		},
	},
}));

const stationData = stations.map((station) => ({
	value: `${station.code}`,
	label: `${station.name} - ${station.code}`,
	group: "Stations",
}));

const AllTrains = () => {
	const { classes, theme } = useStyles();
	const [result, setResult] = useState();
	const [lastDoc, setLastDoc] = useState();
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const q = query(
				collection(db, "trains"),
				orderBy("from_station_name"),
				limit(25)
			);
			const querySnapshot = await getDocs(q);
			setResult(querySnapshot.docs.map((doc) => doc.data()));
			setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
		};
		fetchData();

		return () => {
			setResult();
			setLastDoc();
		};
	}, [selected]);

	const fetchMoreData = async () => {
		setLoading(true);
		const q = query(
			collection(db, "trains"),
			orderBy("from_station_name"),
			startAfter(lastDoc),
			limit(25)
		);

		const querySnapshot = await getDocs(q);
		setResult((prev) => [
			...prev,
			...querySnapshot.docs.map((doc) => doc.data()),
		]);
		setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
		setLoading(false);
	};

	return (
		<Container
			fluid
			sx={(theme) => ({
				width: "80%",
				[theme.fn.smallerThan("md")]: {
					width: "100%",
				},
			})}
		>
			<Center my={20}>
				<Group direction="column">
					<Title order={1}>All Trains</Title>
					<MultiSelect
						className={classes.multiselect}
						value={selected}
						onChange={(values) => setSelected(values)}
						searchable
						size="lg"
						placeholder="Pick all that you like"
						data={[
							...stationData,
							{ value: "rick", label: "Rick", group: "Used to be a pickle" },
							{ value: "morty", label: "Morty", group: "Never was a pickle" },
							{ value: "beth", label: "Beth", group: "Never was a pickle" },
							{
								value: "summer",
								label: "Summer",
								group: "Never was a pickle",
							},
						]}
						maxDropdownHeight={250}
						limit={20}
					/>
				</Group>
			</Center>
			{result ? (
				<ScrollArea
					sx={(theme) => ({
						border: `1px solid ${theme.colors.gray[7]}`,
						borderRadius: theme.radius.md,
					})}
				>
					<Table sx={{ minWidth: 800 }} verticalSpacing="xs">
						<thead>
							<tr style={{ position: "sticky", top: 0 }}>
								<th>From Station</th>
								<th>To Station</th>
								<th>Train Name</th>
								<th>Train Number</th>
								<th>Arrival</th>
								<th>Departure</th>
								<th>Distance</th>
								<th>Duration</th>
							</tr>
						</thead>
						<tbody>
							{result.map((row, index) => {
								return (
									<tr key={nanoid()}>
										<td>
											<Anchor
												component="a"
												size="sm"
												onClick={(event) => event.preventDefault()}
											>
												{row.from_station_name}
											</Anchor>
										</td>
										<td>{row.to_station_name}</td>
										<td>{row.name}</td>
										<td>
											<Anchor
												component="a"
												size="sm"
												onClick={(event) => event.preventDefault()}
											>
												{row.number}
											</Anchor>
										</td>
										<td>{row.arrival}</td>
										<td>{row.departure}</td>
										<td>{row.distance}</td>
										<td>{`${row.duration_h}:${row.duration_m} ${
											index + 1 >= result.length - 10
										}`}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
					{loading && (
						<Center my={10}>
							<Loader />
						</Center>
					)}
					<Center>
						<Button onClick={fetchMoreData}>Fetch More</Button>
					</Center>
				</ScrollArea>
			) : (
				<FullPageLoadingSpinner />
			)}
		</Container>
	);
};

export default AllTrains;
