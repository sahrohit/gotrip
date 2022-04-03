import React, { useState, useEffect } from "react";
import {
	ActionIcon,
	Modal,
	Text,
	TextInput,
	Group,
	Box,
	Button,
	NumberInput,
	Select,
	Space,
	Center,
	Paper,
} from "@mantine/core";
import { BsPencilSquare } from "react-icons/bs";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import { useForm, formList, yupResolver } from "@mantine/form";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import * as Yup from "yup";
import TicketDetail from "@components/BookNow/TicketDetail";
import { BiAt } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { BsCalendar4Event } from "react-icons/bs";

const BookNowSchema = Yup.object().shape({
	initials: Yup.string().required("Required"),
	name: Yup.string().required("Name is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
	phoneNumber: Yup.number().required("Phone is required"),
});

const EditModal = ({ bookingDetails }) => {
	const [opened, setOpened] = useState();
	const [trainData, setTrainData] = useState();

	const router = useRouter();

	const form = useForm({
		schema: yupResolver(BookNowSchema),
		initialValues: {
			initials: bookingDetails.initials,
			name: bookingDetails.name,
			email: bookingDetails.email,
			phoneNumber: bookingDetails.phoneNumber,
			adults: formList(bookingDetails.adults),
			childs: formList(bookingDetails.childs),
			startDate: new Date(dayjs(bookingDetails.startDate).format("YYYY-MM-DD")),
		},
	});

	useEffect(() => {
		const getTrainData = async () => {
			const docSnap = await getDoc(doc(db, "trains", bookingDetails.trainId));
			if (docSnap.exists()) {
				setTrainData({ ...docSnap.data(), ...doc.id });
			}
		};
		getTrainData();
	}, [bookingDetails.trainId]);

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
		<>
			<ActionIcon onClick={() => setOpened(true)}>
				<BsPencilSquare size={16} />
			</ActionIcon>
			<Modal
				size="xl"
				opened={opened}
				onClose={() => setOpened(false)}
				title={<Text size="xl">Update Ticket Details</Text>}
			>
				<Paper p={10}>
					<form
						onSubmit={form.onSubmit(async (values) => {
							await updateDoc(doc(db, "bookings", bookingDetails.bookingId), {
								...values,
								startDate: dayjs(values.startDate).format("YYYY-MM-DD"),
							});
							setOpened(false);
						})}
					>
						<Group direction="row">
							<TicketDetail
								trainData={trainData}
								startDate={form.values.startDate}
							/>
							<Group
								position="center"
								sx={(theme) => ({
									width: "100%",
								})}
							>
								<DatePicker
									clearable={false}
									size="lg"
									inputFormat="MMM D, YYYY"
									icon={<BsCalendar4Event />}
									minDate={new Date()}
									label="StartDate"
									{...form.getInputProps("startDate")}
								/>
							</Group>
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
												<Text size="lg">
													Adult Passengers ({bookingDetails.adults.length})
												</Text>
												<>{adultFields}</>
											</>
										)}
										<Space h="xl" />
										{childFields.length > 0 && (
											<>
												<Text size="lg">
													Child Passengers ({bookingDetails.childs.length})
												</Text>
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
							<Button type="submit">Update</Button>
							<Button
								color="red"
								variant="outline"
								onClick={() => {
									router.back();
								}}
							>
								Cancel
							</Button>
						</Group>
					</form>
				</Paper>
			</Modal>
		</>
	);
};

export default EditModal;
