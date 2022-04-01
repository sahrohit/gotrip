import { Text } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

const BookNow = () => {
	const router = useRouter();

	const {
		trainId,
		fromStation,
		toStation,
		startDate,
		trainClass,
		onewayOrRound,
		adultPassenger,
		childPassenger,
	} = router.query;

	return (
		<>
			<Text>trainId : {trainId}</Text>
			<Text>fromStation : {fromStation}</Text>
			<Text>toStation : {toStation}</Text>
			<Text>startDate : {startDate}</Text>
			<Text>trainClass : {trainClass}</Text>
			<Text>onewayOrRound : {onewayOrRound}</Text>
			<Text>adultPassenger : {adultPassenger}</Text>
			<Text>childPassenger : {childPassenger}</Text>
		</>
	);
};

export default BookNow;
