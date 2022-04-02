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
	Divider,
} from "@mantine/core";
import { AiOutlinePrinter } from "react-icons/ai";

import { onSnapshot, doc } from "firebase/firestore";

import { db } from "../firebase";
import QRCode from "react-qr-code";

const Bookings = () => {
	const router = useRouter();
	const { bookingId } = router.query;

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

	if (loading) {
		Group;
		return <FullPageLoadingSpinner />;
	}

	return (
		<Container
			sx={(theme) => ({
				height: "100vh",
				display: "grid",
				placeItems: "center",
			})}
		>
			<Paper p={10}>
				<Group my={10} p={2} position="apart">
					<Box>
						<Text size="md"> PNR/Booking Ref</Text>
						<Group direction="row" m={2}>
							<Text size="xl">{bookingData.PNR}</Text>
							<Badge size="xl">{bookingData.status}</Badge>
						</Group>
					</Box>
					<Box>
						<Text size="md"> Payment Status</Text>
						<Text size="xl" weight="500">
							Complete
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
							})}
						/>
					</Box>

					{bookingData.adults.map((adult) => {
						return (
							<Group
								key={adult.documentId}
								direction="row"
								sx={(theme) => ({
									flexGrow: 1,
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
									({bookingData.from_station_name} -{" "}
									{bookingData.to_station_name})
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
							<Box key={child.documentId}>
								<Group direction="column" spacing={0}>
									<Text size="xl" weight="500">
										{child.name}
									</Text>
									<Text size="md">(Child)</Text>
								</Group>
								<Text>{child.documentId}</Text>
							</Box>
						);
					})}
				</Group>

				<Group position="center">
					<Button
						onClick={() => {
							window.print();
						}}
						color="blue"
						leftIcon={<AiOutlinePrinter />}
					>
						Print Ticket
					</Button>
				</Group>
			</Paper>
		</Container>
	);
};

export default Bookings;
