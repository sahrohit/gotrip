import React, { useState, useEffect } from "react";
import { Modal, Title, Text, Group, Button, Center, Code } from "@mantine/core";
import { useAuth } from "@contexts/AuthContext";
import { useRouter } from "next/router";
import { getFromStorage, setToStorage } from "@components/helpers/localstorage";
import { MdOutlineEmail } from "react-icons/md";
import { BsCheck2 } from "react-icons/bs";
import { PROTECTED_ROUTES } from "@config/routes";

const VerificationModal = ({ currentUser }) => {
	const router = useRouter();
	const { sendVerificationEmail } = useAuth();
	const [modalOpened, setModalOpened] = useState(
		!!currentUser && !currentUser?.emailVerified
	);

	const [timeLeft, setTimeLeft] = useState(
		getFromStorage("resendVerificationTimeout") - Date.now() / 1000
	);

	const timer = setTimeout(() => {
		setTimeLeft(
			getFromStorage("resendVerificationTimeout") - Date.now() / 1000
		);
	}, 1000);

	useEffect(() => {
		setModalOpened(!!currentUser && !currentUser?.emailVerified);
		return () => {
			setModalOpened();
		};
	}, [currentUser]);

	const formatHHMMSS = (seconds) => {
		let min =
			Math.floor(seconds / 60) >= 10
				? Math.floor(seconds / 60)
				: "0" + Math.floor(seconds / 60);
		seconds -= 60 * min;
		let sec = seconds >= 10 ? seconds : "0" + seconds;
		return min + ":" + sec;
	};

	return (
		<Modal
			size="lg"
			opened={modalOpened}
			onClose={() => {
				if (router.pathname === "/") {
					setModalOpened(false);
				}
			}}
			withCloseButton={!PROTECTED_ROUTES.includes(router.pathname)}
		>
			<Center
				sx={(theme) => ({
					flexDirection: "column",
					gap: theme.spacing.md,
				})}
			>
				<Title
					sx={(theme) => ({
						fontSize: theme.fontSizes[3],
					})}
					order={2}
				>
					Check your inbox.
				</Title>
				<Text color={"gray"} align="center">
					An email has been sent to{" "}
					<Code
						sx={(theme) => ({
							fontSize: theme.fontSizes.lg,
						})}
					>
						{currentUser?.email}
					</Code>{" "}
					with the link to verify.
				</Text>

				<Group position={"`c`enter"}>
					<Button
						size="md"
						color={"green"}
						leftIcon={<MdOutlineEmail size={20} />}
						variant="outline"
						disabled={timeLeft > 0}
						onClick={() => {
							setToStorage(
								"resendVerificationTimeout",
								Math.ceil(Date.now() / 1000) + 60
							);
							sendVerificationEmail(currentUser);
						}}
					>
						{Math.ceil(timeLeft) > 0
							? formatHHMMSS(Math.ceil(timeLeft))
							: "Resend"}
					</Button>
					<Button
						size="md"
						color={"lime"}
						leftIcon={<BsCheck2 size={20} />}
						onClick={() => {
							router.reload();
						}}
					>
						Already Verified?
					</Button>
				</Group>
			</Center>
		</Modal>
	);
};

export default VerificationModal;
