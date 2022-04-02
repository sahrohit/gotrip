import React, { useState, useEffect } from "react";
import {
	Avatar,
	Table,
	Group,
	Text,
	ActionIcon,
	Menu,
	ScrollArea,
	Center,
	Badge,
	Button,
} from "@mantine/core";
import { BsPencilSquare, BsTrash, BsThreeDots } from "react-icons/bs";
import { useAuth } from "@contexts/AuthContext";

import {
	collection,
	addDoc,
	doc,
	setDoc,
	updateDoc,
	onSnapshot,
	getDocs,
	where,
	query,
} from "firebase/firestore";
import { db } from "../../firebase";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import dayjs from "dayjs";
import { useRouter } from "next/router";

export default function Bookings() {
	const router = useRouter();
	const [bookingDetails, setBookingDetails] = useState();
	const [loading, setLoading] = useState(true);
	const {
		currentUser: { uid },
	} = useAuth();

	useEffect(
		() =>
			onSnapshot(
				query(collection(db, "bookings"), where("bookedByUid", "==", uid)),
				(snapshot) => {
					setBookingDetails(
						snapshot.docs.map((doc) => {
							return { ...doc.data(), bookingId: doc.id };
						})
					);
					setLoading(false);
				}
			),
		[uid]
	);

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	const rows = bookingDetails.map((item) => (
		<tr key={item.name}>
			<td>
				<Text color="dimmed" size="xs">
					Status
				</Text>
				<Badge>{item.status}</Badge>
			</td>
			<td>
				<Group spacing="md">
					<div>
						<Text size="md" weight={500}>
							{item.from_station_name}
						</Text>
						<Text color="dimmed" size="xs">
							From
						</Text>
					</div>
				</Group>
			</td>
			<td>
				<Group spacing="md">
					<div>
						<Text size="md" weight={500}>
							{item.to_station_name}
						</Text>
						<Text color="dimmed" size="xs">
							To
						</Text>
					</div>
				</Group>
			</td>
			<td>
				<Text size="md">{item.PNR}</Text>
				<Text size="xs" color="dimmed">
					PNR
				</Text>
			</td>
			<td>
				<Text size="md" weight={500}>
					{item.departureTime.slice(0, -3)} on{" "}
					{dayjs(new Date(item.startDate)).format("MMMM D, YYYY")}
				</Text>
				<Text size="xs" color="dimmed">
					Departure
				</Text>
			</td>
			<td>
				<Text size="md" weight={500}>
					{dayjs(new Date(item.bookedAt.toMillis())).format("MMMM D, YYYY")}
				</Text>
				<Text size="xs" color="dimmed">
					Booked on
				</Text>
			</td>
			<td>
				<Group spacing={0} position="right">
					<ActionIcon>
						<BsPencilSquare size={16} />
					</ActionIcon>
					<ActionIcon
						onClick={() => {
							router.push({
								pathname: "/bookings",
								query: {
									bookingId: item.bookingId,
								},
							});
						}}
					>
						<BsThreeDots size={16} />
					</ActionIcon>
				</Group>
			</td>
		</tr>
	));

	return (
		<>
			{bookingDetails.length > 0 ? (
				<ScrollArea offsetScrollbars={true}>
					<Table sx={{ minWidth: 800 }} verticalSpacing="md">
						<tbody>{rows}</tbody>
					</Table>
				</ScrollArea>
			) : (
				<Group
					direction="column"
					sx={(theme) => ({
						alignItems: "center",
						marginTop: theme.spacing.lg * 3,
					})}
				>
					<Text
						sx={(theme) => ({
							fontSize: theme.fontSizes.xl * 2,
						})}
					>
						No Bookings Found
					</Text>
					<Button
						variant="outline"
						onClick={() => {
							router.push("/");
						}}
					>
						Book Now
					</Button>
				</Group>
			)}
		</>
	);
}
