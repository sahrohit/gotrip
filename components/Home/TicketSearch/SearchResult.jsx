import React from "react";
import { ScrollArea, Group, Text, Divider, Center } from "@mantine/core";
import { SearchResultCard } from "./SearchResultCard";
import { nanoid } from "nanoid";
import { COLORS } from "@config/colors";

const SearchResult = ({ result, setResult }) => {
	return (
		<>
			<Divider
				my="xs"
				label={`Search Result (Showing ${result.length} results)`}
				labelPosition="center"
			/>
			{result.length > 0 ? (
				<ScrollArea style={{ height: "280px" }} offsetScrollbars>
					<div>
						{result
							.sort((a, b) =>
								parseInt(a.arrival.substring(0, 2)) >
								parseInt(b.arrival.substring(0, 2))
									? 1
									: -1
							)
							.map((item, index) => (
								<SearchResultCard
									id={item.id}
									key={item.id}
									name={item.name}
									from_station_code={item.from_station_code}
									to_station_code={item.to_station_code}
									from_station_name={item.from_station_name}
									to_station_name={item.to_station_name}
									number={item.number}
									duration_h={item.duration_h}
									duration_m={item.duration_m}
									arrival_date={item.arrival_date}
									departure_date={item.departure_date}
									arrival={item.arrival}
									departure={item.departure}
									first_ac={item.first_ac}
									second_ac={item.second_ac}
									third_ac={item.third_ac}
									sleeper={item.sleeper}
									showOnMap={item.showOnMap}
									distance={item.distance}
									setResult={setResult}
									color={COLORS[index].mantineColor}
								/>
							))}
					</div>
				</ScrollArea>
			) : (
				<Center
					sx={(theme) => ({ height: "100px" })}
					component={Text}
					color="dimmed"
				>
					No Available Trains!
				</Center>
			)}
		</>
	);
};

export default SearchResult;
