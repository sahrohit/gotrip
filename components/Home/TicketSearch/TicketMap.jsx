import React, { useState, useEffect } from "react";
import { useMantineTheme, Tooltip } from "@mantine/core";
import {
	ComposableMap,
	Geographies,
	Geography,
	Line,
	Marker,
} from "react-simple-maps";
import { nanoid } from "nanoid";
import { COLORS } from "@config/colors";
import { motion, AnimatePresence } from "framer-motion";

const geoUrl = "india-state-topo.json";

const TicketMap = ({ result }) => {
	const { colorScheme } = useMantineTheme();
	const [calcCoordinates, setCalcCoordinates] = useState(
		result?.map((item) => {
			if (item.showOnMap) {
				return item.coordinates?.map((coords) => [coords.lat, coords.long]);
			}
		})
	);

	useEffect(() => {
		setCalcCoordinates(
			result?.map((item) => {
				if (item.showOnMap) {
					return item.coordinates?.map((coords) => [coords.lat, coords.long]);
				}
			})
		);

		return () => {
			setCalcCoordinates();
		};
	}, [result]);

	return (
		<AnimatePresence>
			<motion.div initial={{ opacity: 0, x: 100 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }}>
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
					{calcCoordinates?.map((coordinate, index) => {
						return (
							<Line
								key={nanoid()}
								coordinates={coordinate}
								stroke={COLORS[index].color}
								// "#F53"
								strokeWidth={1}
								strokeLinecap="round"
								style={{
									hover: {
										strokeWidth: 2,
									},
								}}
							/>
						);
					})}
				</ComposableMap>
			</motion.div>
		</AnimatePresence>
	);
};

export default TicketMap;
