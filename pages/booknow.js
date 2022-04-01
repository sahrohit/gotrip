import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import { useForm, formList } from "@mantine/form";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import {
	TextInput,
	Switch,
	Group,
	ActionIcon,
	Box,
	Text,
	Button,
	Code,
} from "@mantine/core";
import { BsTrash } from "react-icons/bs";

const BookNow = () => {
	const router = useRouter();
	const [trainData, setTrainData] = useState();

	const form = useForm({
		initialValues: {
			employees: formList([{ name: "", active: false }]),
		},
	});

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

	useEffect(() => {
		const getTrainData = async () => {
			const docSnap = await getDoc(doc(db, "trains", trainId));
			if (docSnap.exists()) {
				setTrainData({ ...docSnap.data(), ...doc.id });
			}
		};
		getTrainData();
	}, []);

	if (!trainData) {
		return <FullPageLoadingSpinner />;
	}

	const fields = form.values.employees.map((_, index) => (
		<Group key={index} mt="xs">
			<TextInput
				placeholder="John Doe"
				required
				sx={{ flex: 1 }}
				{...form.getListInputProps("employees", index, "name")}
			/>
			<Switch
				label="Active"
				{...form.getListInputProps("employees", index, "active")}
			/>
			<ActionIcon
				color="red"
				variant="hover"
				onClick={() => form.removeListItem("employees", index)}
			>
				<BsTrash size={16} />
			</ActionIcon>
		</Group>
	));

	return (
		<>
			<Box sx={{ maxWidth: 500 }} mx="auto">
				{fields.length > 0 ? (
					<Group mb="xs">
						<Text weight={500} size="sm" sx={{ flex: 1 }}>
							Name
						</Text>
						<Text weight={500} size="sm" pr={90}>
							Status
						</Text>
					</Group>
				) : (
					<Text color="dimmed" align="center">
						No one here...
					</Text>
				)}

				{fields}

				<Group position="center" mt="md">
					<Button
						onClick={() =>
							form.addListItem("employees", { name: "", active: false })
						}
					>
						Add employee
					</Button>
				</Group>
			</Box>

			<Text>trainId : {trainId}</Text>
			<Text>fromStation : {fromStation}</Text>
			<Text>toStation : {toStation}</Text>
			<Text>startDate : {startDate}</Text>
			<Text>trainClass : {trainClass}</Text>
			<Text>onewayOrRound : {onewayOrRound}</Text>
			<Text>adultPassenger : {adultPassenger}</Text>
			<Text>childPassenger : {childPassenger}</Text>
			<Text>Data : {JSON.stringify(trainData)}</Text>
		</>
	);
};

export default BookNow;
