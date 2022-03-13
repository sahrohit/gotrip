import React, { useState } from "react";
import { Center, Modal, SegmentedControl } from "@mantine/core";
import Login from "./Login";
import Register from "./Register";
import ResetPasswordModal from "./ResetPasswordModal";

const AuthModal = ({ opened, setOpened }) => {
	const [segmentedControlValue, setSegmentedControlValue] = useState("login");

	const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);

	return (
		<Modal
			size="md"
			opened={opened}
			onClose={() => {
				setOpened(false);
				setForgotPasswordModalOpen(false);
			}}
			withCloseButton={true}
			overflow="outside"
		>
			{!forgotPasswordModalOpen && (
				<Center>
					<SegmentedControl
						value={segmentedControlValue}
						onChange={setSegmentedControlValue}
						size="md"
						data={[
							{ label: "Login", value: "login" },
							{ label: "Register", value: "register" },
						]}
					/>
				</Center>
			)}

			{forgotPasswordModalOpen ? (
				<ResetPasswordModal
					forgotPasswordModalOpen={forgotPasswordModalOpen}
					setForgotPasswordModalOpen={setForgotPasswordModalOpen}
				/>
			) : segmentedControlValue === "login" ? (
				<Login
					forgotPasswordModalOpen={forgotPasswordModalOpen}
					setForgotPasswordModalOpen={setForgotPasswordModalOpen}
				/>
			) : (
				<Register />
			)}
		</Modal>
	);
};

export default AuthModal;
