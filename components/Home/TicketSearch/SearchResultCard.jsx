import React, { useState } from "react";
import {
	Text,
	Group,
	Paper,
	Divider,
	Chips,
	Chip,
	Center,
	Button,
	SegmentedControl,
} from "@mantine/core";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import { BsX } from "react-icons/bs";

import { COLORS } from "@config/colors";
import { useNotifications } from "@mantine/notifications";
import AuthModal from "@components/Auth/AuthModal";
import { useAuth } from "@contexts/AuthContext";
import calculatePrice from "@components/helpers/price";

export function SearchResultCard({
	item,
	fromStation,
	toStation,
	startDate,
	trainClass,
	onewayOrRound,
	adultPassenger,
	childPassenger,
	id,
	name,
	from_station_name,
	from_station_code,
	to_station_name,
	to_station_code,
	number,
	duration_h,
	duration_m,
	arrival_date,
	departure_date,
	arrival,
	departure,
	first_ac,
	second_ac,
	third_ac,
	sleeper,
	showOnMap,
	distance,
	setResult,
	color,
}) {
	const notifications = useNotifications();
	const [openedAuthModal, setOpenedAuthModal] = useState(false);
	const { currentUser } = useAuth();

	const [selectedTrainClass, setSeletcedTrainClass] = useState();
	const router = useRouter();

	const price = calculatePrice(distance, selectedTrainClass);

	return (
		<Paper withBorder p="md" radius="md" my={10}>
			<Group position="apart" noWrap>
				<Group align="flex-end" spacing="xs">
					<Text size="xl" weight={600}>
						{name}
					</Text>
					<Text color="teal" size="md" weight={600}>
						({number})
					</Text>
				</Group>
				<SegmentedControl
					orientation="horizontal"
					value={showOnMap ? "on" : "off"}
					color={color}
					radius="md"
					size="xs"
					data={[
						{ label: "Show", value: "on" },
						{ label: "Don't Show", value: "off" },
					]}
					onChange={(val) => {
						setResult((prev) => {
							const foundIndex = prev.findIndex((item) => item.id == id);
							const updatedIndex = {
								...prev[foundIndex],
								showOnMap: val === "on" ? true : false,
							};
							const resultWithoutIndex = prev.filter((item) => item.id != id);
							return [...resultWithoutIndex, updatedIndex];
						});
					}}
				/>
			</Group>
			<Group position="apart" align="center" noWrap>
				<Text>
					{from_station_name} ({from_station_code})
					<Text color="dimmed" size="xs">
						{departure} | {dayjs(startDate).format("MMM D, YYYY")}
					</Text>
				</Text>
				<Divider
					sx={(theme) => ({
						flexGrow: 1,
					})}
					label={
						<Group direction="column" spacing={0}>
							<Center>
								<Text
									align="center"
									size="xs"
								>{`${duration_h}h ${duration_m}m`}</Text>
							</Center>
							<Center>
								<Text align="center" size="xs">
									{`${distance} km`}
								</Text>
							</Center>
						</Group>
					}
					labelPosition="center"
				/>
				<Text align="right">
					{to_station_name} ({to_station_code})
					<Text color="dimmed" size="xs" align="right">
						{arrival} |{" "}
						{dayjs(dayjs(startDate).format("MMM D, YYYY"))
							.add(duration_h, "hour")
							.add(duration_m, "minute")
							.add(parseInt(departure.slice(0, 2)), "hour")
							.add(parseInt(departure.slice(3, 5)), "minute")
							.format("MMM D, YYYY")}
					</Text>
				</Text>
			</Group>

			<Chips
				component={Center}
				sx={(theme) => ({
					margin: theme.spacing.md,
				})}
				onChange={(val) => setSeletcedTrainClass(val)}
			>
				<Chip value="first_ac" disabled={first_ac === 0}>
					First Class
				</Chip>
				<Chip value="second_ac" disabled={second_ac === 0}>
					Second AC
				</Chip>
				<Chip value="third_ac" disabled={third_ac === 0}>
					Third AC
				</Chip>
				<Chip value="sleeper" disabled={sleeper === 0}>
					Sleeper
				</Chip>
			</Chips>

			<Button
				color={color}
				fullWidth
				onClick={() => {
					if (selectedTrainClass) {
						if (currentUser) {
							router.push({
								pathname: "/booknow",
								query: {
									trainId: id,
									startDate: dayjs(startDate).format("YYYY-MM-DD"),
									trainClass: selectedTrainClass,
									onewayOrRound,
									adultPassenger,
									childPassenger,
								},
							});
						} else {
							setOpenedAuthModal(true);
							notifications.showNotification({
								radius: "md",
								icon: <BsX size={18} />,
								color: "yellow",
								title: "Please Login to Continue",
							});
						}
					} else {
						notifications.showNotification({
							radius: "md",
							icon: <BsX size={18} />,
							color: "red",
							title: "Please select a class",
							message:
								"Select from the available class shown above the Book Now button.",
						});
					}
				}}
			>
				Book Now {price && `for Rs ${price}/adult & Rs ${price / 2}/child`}
			</Button>
			<AuthModal
				opened={openedAuthModal}
				setOpened={setOpenedAuthModal}
				redirect={`/booknow?trainId=${id}&startDate=${dayjs(startDate).format(
					"YYYY-MM-DD"
				)}&trainClass=${selectedTrainClass}&onewayOrRound=${onewayOrRound}&adultPassenger=${adultPassenger}&childPassenger=${childPassenger}`}
			/>
		</Paper>
	);
}
