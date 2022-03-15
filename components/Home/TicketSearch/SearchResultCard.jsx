import React from "react";
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

import dayjs from "dayjs";
import { COLORS } from "@config/colors";

export function SearchResultCard({
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
					orientation="vertical"
					value={showOnMap ? "on" : "off"}
					color={color}
					radius="md"
					size="xs"
					data={[
						{ label: "Show", value: "on" },
						{ label: "Not Show", value: "off" },
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
						{arrival} | {dayjs(new Date()).format("MMM D, YYYY")}
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
						{departure} |{" "}
						{dayjs(new Date())
							.add(duration_h, "hour")
							.add(duration_m, "minute")
							.format("MMM D, YYYY")}
					</Text>
				</Text>
			</Group>

			<Chips
				component={Center}
				sx={(theme) => ({
					margin: theme.spacing.md,
				})}
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

			<Button color={color} fullWidth>
				Book Now
			</Button>
		</Paper>
	);
}
