import { Group, Text, Divider, Center, Paper } from "@mantine/core";
import React from "react";
import dayjs from "dayjs";

const TicketDetail = ({ trainData, startDate }) => {
	return (
		<Paper
			sx={(theme) => ({
				width: "100%",
				marginTop: theme.spacing.xl * 2,
			})}
		>
			<Group
				position="apart"
				align="center"
				noWrap
				sx={(theme) => ({
					width: "100%",
				})}
			>
				<Text>
					{trainData.from_station_name} ({trainData.from_station_code})
					<Text color="dimmed" size="xs">
						{trainData.departure} |{" "}
						{dayjs(new Date(startDate)).format("MMM D, YYYY")}
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
								>{`${trainData.duration_h}h ${trainData.duration_m}m`}</Text>
							</Center>
							<Center>
								<Text align="center" size="xs">
									{`${trainData.distance} km`}
								</Text>
							</Center>
						</Group>
					}
					labelPosition="center"
				/>
				<Text align="right">
					{trainData.to_station_name} ({trainData.to_station_code})
					<Text color="dimmed" size="xs" align="right">
						{trainData.departure} |{" "}
						{dayjs(new Date(startDate))
							.add(trainData.duration_h, "hour")
							.add(trainData.duration_m, "minute")
							.add(parseInt(trainData.departure.slice(0, 2)), "hour")
							.add(parseInt(trainData.departure.slice(3, 5)), "minute")
							.format("MMM D, YYYY")}
					</Text>
				</Text>
			</Group>
		</Paper>
	);
};

export default TicketDetail;
