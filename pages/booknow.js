import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import {
	doc,
	getDoc,
	addDoc,
	collection,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

import { useForm, formList, yupResolver } from "@mantine/form";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import {
	TextInput,
	Group,
	Box,
	Text,
	Button,
	Container,
	NumberInput,
	Select,
	Space,
	Center,
} from "@mantine/core";
import { customAlphabet } from "nanoid";
import * as Yup from "yup";
import TicketDetail from "@components/BookNow/TicketDetail";
import { useAuth } from "@contexts/AuthContext";
import { BiAt } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";

const BookNowSchema = Yup.object().shape({
	initials: Yup.string().required("Required"),
	name: Yup.string().required("Name is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
	phoneNumber: Yup.number().required("Phone is required"),
});

const BookNow = () => {
	const router = useRouter();
	const { currentUser } = useAuth();
	const [trainData, setTrainData] = useState();

	const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);

	const {
		trainId,
		startDate,
		trainClass,
		onewayOrRound,
		adultPassenger,
		childPassenger,
	} = router.query;

	const form = useForm({
		schema: yupResolver(BookNowSchema),
		initialValues: {
			initials: "mr",
			name: "",
			email: "",
			phoneNumber: null,
			adults: formList(
				Array(parseInt(adultPassenger)).fill({ name: "", documentId: "" })
			),
			childs: formList(
				Array(parseInt(childPassenger)).fill({ name: "", documentId: "" })
			),
		},
	});

	useEffect(() => {
		const getTrainData = async () => {
			const docSnap = await getDoc(doc(db, "trains", trainId));
			if (docSnap.exists()) {
				setTrainData({ ...docSnap.data(), ...doc.id });
			}
		};
		getTrainData();
	}, [trainId]);

	if (!trainData) {
		return <FullPageLoadingSpinner />;
	}

	const adultFields = form.values.adults.map((_, index) => (
		<Group key={index} mt="xs">
			<TextInput
				label="Name"
				placeholder="Joe Mama"
				required
				sx={{ flex: 1 }}
				{...form.getListInputProps("adults", index, "name")}
			/>
			<TextInput
				label="Document Number:"
				placeholder="Passport No."
				required
				sx={{ flex: 1 }}
				{...form.getListInputProps("adults", index, "documentId")}
			/>
		</Group>
	));

	const childFields = form.values.childs.map((_, index) => (
		<Group key={index} mt="xs">
			<TextInput
				label="Name"
				placeholder="Joe Mama"
				required
				sx={{ flex: 1 }}
				{...form.getListInputProps("childs", index, "name")}
			/>
			<TextInput
				label="Document Number:"
				placeholder="Birth Certificate No."
				required
				sx={{ flex: 1 }}
				{...form.getListInputProps("childs", index, "documentId")}
			/>
		</Group>
	));

	return (
		<Container>
			<form
				onSubmit={form.onSubmit(async (values) => {
					const gender = values.initials === "mrs" ? "male" : "female";
					const docRef = await addDoc(collection(db, "bookings"), {
						...values,
						trainClass,
						startDate,
						gender,
						trainId,
						PNR: nanoid(),
						bookedByUid: currentUser.uid,
						bookedByName: currentUser.displayName,
						bookedByEmail: currentUser.email,
						from_station_name: trainData.from_station_name,
						to_station_name: trainData.to_station_name,
						departureTime: trainData.departure,
						arrivalTime: trainData.arrival,
						bookedAt: serverTimestamp(),
						status: "confirmed",
					});
					router.replace({
						pathname: "/bookings",
						query: {
							bookingId: docRef.id,
						},
					});
				})}
			>
				<Group direction="row">
					<TicketDetail trainData={trainData} startDate={startDate} />
					<Group
						direction="row"
						size="xl"
						sx={(theme) => ({
							width: "100%",
							justifyContent: "space-around",
						})}
					>
						<Box>
							<Box my={20}>
								<Text size="xl">Contact Information</Text>
								<Text size="sm" color="dimmed">
									Ticket Details will be sent to these Information.
								</Text>
							</Box>
							<Group
								direction="column"
								sx={(theme) => ({
									justifyContent: "flex-start",
									alignItems: "flex-start",
								})}
							>
								<Select
									sx={(theme) => ({
										width: "100%",
									})}
									data={[
										{ value: "mr", label: "Mr." },
										{ value: "mrs", label: "Mrs." },
										{ value: "joke", label: "Attack Helicopter" },
									]}
									{...form.getInputProps("initials")}
								/>

								<TextInput
									size="md"
									type="text"
									sx={(theme) => ({
										width: "100%",
									})}
									label="Name"
									icon={<AiOutlineUser />}
									placeholder="Name"
									error={form.errors.name}
									{...form.getInputProps("name")}
									autoComplete="firstName"
								/>

								<TextInput
									size="md"
									type="email"
									sx={(theme) => ({
										width: "100%",
									})}
									label="Email"
									icon={<BiAt />}
									placeholder="Email"
									error={form.errors.email}
									{...form.getInputProps("email")}
									autoComplete="email"
								/>
								<NumberInput
									size="md"
									sx={(theme) => ({
										width: "100%",
									})}
									label="Contact Number"
									icon={<BsTelephone />}
									placeholder="Contact Number"
									error={form.errors.phoneNumber}
									{...form.getInputProps("phoneNumber")}
									autoComplete="tel-national"
									hideControls
								/>
							</Group>
						</Box>
						<Group direction="column">
							<Box sx={{ maxWidth: 500 }} mx="auto">
								<Center my={20}>
									<Text size="xl">Traveller`s Information</Text>
								</Center>

								{adultFields.length > 0 && (
									<>
										<Text size="lg">Adult Passengers ({adultPassenger})</Text>
										<>{adultFields}</>
									</>
								)}
								<Space h="xl" />
								{childFields.length > 0 && (
									<>
										<Text size="lg">Child Passengers ({childPassenger})</Text>
										<Text size="sm" color="dimmed">
											Only for age 0-12
										</Text>
										<>{childFields}</>
									</>
								)}
							</Box>
						</Group>
					</Group>
				</Group>

				<Group
					direction="row"
					spacing="xl"
					sx={(theme) => ({
						width: "100%",
						justifyContent: "center",
						marginTop: theme.spacing.xl,
						marginBottom: theme.spacing.xl,
					})}
				>
					<Button type="submit">Book Now</Button>
					<Button color="red" variant="outline">
						Cancel
					</Button>
				</Group>
			</form>
		</Container>
	);
};

export default BookNow;
