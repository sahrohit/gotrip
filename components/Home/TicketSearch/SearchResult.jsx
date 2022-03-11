import React from "react";
import { ScrollArea, Group } from "@mantine/core";
import { SearchResultCard } from "./SearchResultCard";
import { nanoid } from "nanoid";

const SearchResult = ({ result }) => {
	return (
		<ScrollArea grow style={{ height: "280px" }} offsetScrollbars>
			<div>
				{result.map((item, index) => (
					<SearchResultCard
						key={nanoid()}
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
					/>
				))}
			</div>
		</ScrollArea>
	);
};

export default SearchResult;
