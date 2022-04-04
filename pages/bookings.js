import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BookingTicketDetail from "@components/Bookings/BookingTicketDetail";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import {
	Badge,
	Container,
	Paper,
	Text,
	Box,
	Group,
	Space,
	Button,
} from "@mantine/core";
import { AiOutlinePrinter } from "react-icons/ai";

import { onSnapshot, doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";
import QRCode from "react-qr-code";
import { useModals } from "@mantine/modals";
import { colorizeFromText } from "@components/helpers/colorize";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Bookings = () => {
	const router = useRouter();
	const { bookingId } = router.query;

	const modals = useModals();
	const [bookingData, setBookingData] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(
		() =>
			onSnapshot(doc(db, "bookings", bookingId), (doc) => {
				setBookingData(doc.data());
				setLoading(false);
			}),
		[bookingId]
	);

	const openDeleteModal = () =>
		modals.openConfirmModal({
			title: "Cancel your Ticket",
			centered: true,
			children: (
				<Text size="sm">
					Are you sure you want to cancel your ticket? You`ll{" "}
					<strong>
						only be refunded 70% (i.e Rs {(bookingData.price * 7) / 10})
					</strong>{" "}
					of your money.
					<br />
					Your money will be refuned within a week.
				</Text>
			),
			labels: { confirm: "Cancel Ticket", cancel: "No Don't Cancel it" },
			confirmProps: { color: "red" },
			onConfirm: async () => {
				await updateDoc(doc(db, "bookings", bookingId), {
					status: "cancelled",
				});
			},
		});

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	const bookingStatus =
		dayjs(new Date()).diff(
			dayjs(dayjs(bookingData.startDate).format("MMM D, YYYY"))
				.add(bookingData.duration_h, "hour")
				.add(bookingData.duration_m, "minute")
				.add(parseInt(bookingData.departureTime.slice(0, 2)), "hour")
				.add(parseInt(bookingData.departureTime.slice(3, 5)), "minute")
		) > 0
			? "completed"
			: bookingData.status;

	return (
		<Container
			sx={(theme) => ({
				height: "100vh",
				display: "grid",
				placeItems: "center",
			})}
		>
			<Paper p={10}>
				<Text>
					Date of Booking:{" "}
					{dayjs(new Date(bookingData.bookedAt.toMillis())).format(
						"MMMM D, YYYY"
					)}
				</Text>
				<Group my={10} p={2} position="apart">
					<Box>
						<Text size="md"> PNR/Booking Ref</Text>
						<Group direction="row" m={2}>
							<Text size="xl">{bookingData.PNR}</Text>
							<Badge size="xl" color={colorizeFromText(bookingStatus)}>
								{bookingStatus}
							</Badge>
						</Group>
					</Box>
					<Box>
						<Text size="md"> Payment Status</Text>
						<Text size="xl" weight="500">
							Complete (Rs {Math.round(bookingData.price)}.0)
						</Text>
					</Box>
				</Group>
				<BookingTicketDetail
					trainId={bookingData.trainId}
					startDate={bookingData.startDate}
				/>

				<Space h={26} />

				<Text
					sx={(theme) => ({
						fontSize: 1.5 * theme.fontSizes.xl,
						fontWeight: "semi-bold",
					})}
				>
					Passenger Information
				</Text>
				<Group
					p={10}
					spacing="xl"
					direction="row"
					sx={(theme) => ({
						width: "100%",
						alignItems: "center",
					})}
				>
					<Box>
						<QRCode
							bgColor="#FFFFFF"
							size={150}
							value={JSON.stringify({
								bookingId,
								PNR: bookingData.PNR,
								status: bookingData.status,
							})}
						/>
					</Box>

					<Group
						direction="column"
						sx={(theme) => ({
							flexGrow: 1,
						})}
					>
						{bookingData.adults.map((adult) => {
							return (
								<Group
									key={adult.documentId}
									direction="row"
									sx={(theme) => ({
										width: "100%",
										justifyContent: "space-around",
									})}
								>
									<Group direction="column" spacing={0}>
										<Text size="xl" weight="500">
											{adult.name}
										</Text>
										<Text size="md">(Adult)</Text>
									</Group>
									<Text>
										({bookingData.from_station_code} -{" "}
										{bookingData.to_station_code})
									</Text>
									<Group direction="column" spacing={0} align="center">
										<Text align="right" size="xl" weight="500">
											{adult.documentId}
										</Text>
										<Text size="md">Document No.</Text>
									</Group>
								</Group>
							);
						})}
						{bookingData.childs.map((child) => {
							return (
								<Group
									key={child.documentId}
									direction="row"
									sx={(theme) => ({
										width: "100%",
										justifyContent: "space-around",
									})}
								>
									<Group direction="column" spacing={0}>
										<Text size="xl" weight="500">
											{child.name}
										</Text>
										<Text size="md">(Adult)</Text>
									</Group>
									<Text>
										({bookingData.from_station_code} -{" "}
										{bookingData.to_station_code})
									</Text>
									<Group direction="column" spacing={0} align="center">
										<Text align="right" size="xl" weight="500">
											{child.documentId}
										</Text>
										<Text size="md">Document No.</Text>
									</Group>
								</Group>
							);
						})}
					</Group>
				</Group>

				<Group
					position="center"
					sx={(theme) => ({
						marginTop: "20px",
					})}
				>
					<Button
						onClick={() => {
							router.push("/dashboard");
						}}
					>
						Show all my Bookings
					</Button>
					<Button
						onClick={() => {
							window.print();
						}}
						color="blue"
						leftIcon={<AiOutlinePrinter />}
					>
						Print Ticket
					</Button>
					<Button color="red" variant="outline" onClick={openDeleteModal}>
						Cancel
					</Button>
				</Group>
			</Paper>
		</Container>
	);
};

export default Bookings;
