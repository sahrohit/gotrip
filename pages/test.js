import { Button } from "@mantine/core";
import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const Test = () => {
	const handleClick = async () => {
		const q = query(
			collection(db, "trains"),
			where("from_station_code", "==", "PUNE"),
			where("to_station_code", "==", "GKP")
		);
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			console.log(doc.id, " => ", doc.data());
		});
	};

	return (
		<>
			<Button onClick={handleClick}>Update Database</Button>
		</>
	);
};

export default Test;
