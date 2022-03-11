import React from "react";
import { useMantineTheme, Tooltip } from "@mantine/core";
import {
	ComposableMap,
	Geographies,
	Geography,
	Line,
	Marker,
} from "react-simple-maps";

const geoUrl = "india-state-topo.json";

const TicketMap = ({ coordinates }) => {
	const { colorScheme } = useMantineTheme();

	return (
		<ComposableMap
			projection="geoMercator"
			width={250}
			height={250}
			projectionConfig={{
				scale: 460,
				center: [81.9629, 22.5937],
			}}
		>
			<Geographies
				geography={geoUrl}
				fill="#D6D6DA"
				stroke={colorScheme === "dark" ? "#1a1b1e" : "#fff"}
				strokeWidth={0.2}
			>
				{({ geographies }) =>
					geographies.map((geo) => (
						<Geography key={geo.rsmKey} geography={geo} />
					))
				}
			</Geographies>
			{/* <Marker coordinates={[76.646013, 12.318946]} fill="#777">
				<circle r={2} fill="#F53" />
				<text
					fontSize={8}
					textAnchor="middle"
					alignmentBaseline="before-edge"
					fill="#1f588c"
				>
					Hello
				</text>
			</Marker> */}

			<Line
				coordinates={coordinates}
				stroke="#F53"
				strokeWidth={1}
				strokeLinecap="round"
			/>
		</ComposableMap>
	);
};

export default TicketMap;
