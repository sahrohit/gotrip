import React, { useState } from "react";
import {
	Group,
	Select,
	Paper,
	Box,
	Button,
	Center,
	Collapse,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { DatePicker, DateRangePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { query, getDocs, collection, where } from "firebase/firestore";

import Passgenger from "./Passgenger";
import { stations } from "@config/stations";
import TicketMap from "./TicketMap";
import SearchResult from "./SearchResult";
import { db } from "../../../firebase";

import { VscArrowSwap, VscArrowRight } from "react-icons/vsc";
import { BsCalendar4Event, BsCalendar2Week } from "react-icons/bs";
import {
	IoPinOutline,
	IoLocationOutline,
	IoTrainOutline,
} from "react-icons/io5";
import Recommend from "./Recommend";

const TicketSearch = () => {
	const [adultPassenger, setAdultPassenger] = useState(1);
	const [childPassenger, setChildPassenger] = useState(0);

	const form = useForm({
		initialValues: {
			onewayOrRound: "one-way",
			trainClass: "all",
			fromStation: "",
			toStation: "",
			startDate: new Date(),
			endDate: new Date(dayjs(new Date()).add(1, "day")),
		},

		validationRules: {
			onewayOrRound: (value) => value === "one-way" || value === "two-way",
			adultPassenger: (value) => value > 0,
			childPassenger: (value) => value >= 0,
			trainClass: (value) =>
				value === "sl" ||
				value === "3a" ||
				value === "2a" ||
				value === "1a" ||
				value === "all",
			fromStation: (value) => value !== "",
			toStation: (value) => value !== "",
		},
	});

	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(
		new Date(dayjs(new Date()).add(2, "days"))
	);

	const [result, setResult] = useState();
	const [loading, setLoading] = useState();

	const stationData = stations.map((station) => ({
		value: `${station.code}`,
		label: `${station.name} - ${station.code}`,
	}));

	return (
		<Box
			sx={(theme) => ({
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-around",
				[theme.fn.smallerThan("md")]: {
					flexDirection: "column-reverse",
				},
			})}
		>
			<Box
				sx={(theme) => ({
					width: "45%",
					margin: theme.spacing.lg,
					[theme.fn.smallerThan("md")]: {
						margin: "auto",
						width: "98%",
					},
				})}
			>
				<form
					onSubmit={form.onSubmit(async (values) => {
						setLoading(true);
						const q = query(
							collection(db, "trains"),
							where("from_station_code", "==", values.fromStation),
							where("to_station_code", "==", values.toStation)
						);
						const querySnapshot = await getDocs(q);
						setResult(
							querySnapshot.docs.map((doc) => {
								return { ...doc.data(), showOnMap: true, id: doc.id };
							})
						);
						setLoading(false);
					})}
				>
					<Paper
						p="xl"
						withBorder
						sx={(theme) => ({
							borderRadius: theme.radius.md,
							boxShadow: theme.shadows.lg,
						})}
					>
						<Group my={10} position="center">
							<Select
								icon={
									form.values.onewayOrRound === "one-way" ? (
										<VscArrowRight />
									) : (
										<VscArrowSwap />
									)
								}
								data={[
									{ value: "one-way", label: "One Way" },
									{ value: "two-way", label: "Round Trip" },
								]}
								{...form.getInputProps("onewayOrRound")}
							/>
							<Passgenger
								adultPassenger={adultPassenger}
								setAdultPassenger={setAdultPassenger}
								childPassenger={childPassenger}
								setChildPassenger={setChildPassenger}
							/>
							<Select
								data={[
									{ value: "all", label: "All" },
									{ value: "sl", label: "Sleeper (SL)" },
									{ value: "3a", label: "AC 3 Tier (3A)" },
									{ value: "2a", label: "AC 2 Tier (2A)" },
									{ value: "1a", label: "AC First Class (1A)" },
								]}
								{...form.getInputProps("trainClass")}
							/>
						</Group>
						<Group
							align="center"
							sx={(theme) => ({
								justifyContent: "space-around",
							})}
						>
							<Select
								size="lg"
								icon={<IoPinOutline />}
								placeholder="From where?"
								searchable
								nothingFound="No options"
								maxDropdownHeight={280}
								data={stationData}
								{...form.getInputProps("fromStation")}
								limit={20}
							/>
							<Select
								size="lg"
								icon={<IoLocationOutline />}
								placeholder="To where?"
								searchable
								nothingFound="No options"
								maxDropdownHeight={280}
								data={stationData}
								{...form.getInputProps("toStation")}
								limit={20}
							/>

							{form.values.onewayOrRound === "one-way" && (
								<DatePicker
									clearable={false}
									size="lg"
									inputFormat="MMM D, YYYY"
									icon={<BsCalendar4Event />}
									minDate={new Date()}
									{...form.getInputProps("startDate")}
								/>
							)}

							{form.values.onewayOrRound === "two-way" && (
								<DateRangePicker
									clearable={false}
									size="lg"
									inputFormat="MMM D, YYYY"
									icon={<BsCalendar2Week />}
									placeholder="Pick dates range"
									// {...form.getInputProps("startDate")}
									value={[startDate, endDate]}
									onChange={(val) => {
										setStartDate(new Date(val[0]));
										setEndDate(new Date(val[1]));
									}}
								/>
							)}
						</Group>
						<Center m={14}>
							<Button leftIcon={<IoTrainOutline fontSize={24} />} type="submit">
								Search
							</Button>
						</Center>

						<Collapse in={result}>
							{result && (
								<SearchResult
									fromStation={form.values.fromStation}
									toStation={form.values.toStation}
									startDate={form.values.startDate}
									trainClass={form.values.trainClass}
									onewayOrRound={form.values.onewayOrRound}
									adultPassenger={adultPassenger}
									childPassenger={childPassenger}
									result={result}
									setResult={setResult}
									loading={loading}
								/>
							)}
						</Collapse>
					</Paper>

					{!result && (
						<Recommend
						// setToStation={setToStation}
						/>
					)}
				</form>
			</Box>
			<Box
				sx={(theme) => ({
					width: "40%",
					height: "80%",
					[theme.fn.smallerThan("md")]: {
						width: "100%",
					},
				})}
			>
				<TicketMap result={result} />
			</Box>
		</Box>
	);
};

export default TicketSearch;
