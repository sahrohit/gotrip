import React from "react";
import {
	createStyles,
	Text,
	Group,
	Paper,
	Divider,
	ActionIcon,
	Chips,
	Chip,
	Center,
	Button,
} from "@mantine/core";

import { MdOutlineAnalytics } from "react-icons/md";
import dayjs from "dayjs";

export function SearchResultCard({
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
}) {
	return (
		<Paper withBorder p="md" radius="md" my={10}>
			<Group position="apart">
				<Group align="flex-end" spacing="xs">
					<Text size="xl" weight={600}>
						{name}
					</Text>
					<Text color="teal" size="md" weight={600}>
						({number})
					</Text>
				</Group>
				<ActionIcon
					onClick={() => {
						//Update the Map
					}}
				>
					<MdOutlineAnalytics size={20} />
				</ActionIcon>
			</Group>

			{/* <Text color="dimmed" size="sm">
				Page views compared to previous month
			</Text> */}

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
					label={`${duration_h}h ${duration_m}m`}
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

			<Button fullWidth>Book Now</Button>
		</Paper>
	);
}
