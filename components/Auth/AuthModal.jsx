import React, { useState } from "react";
import { Center, Modal, SegmentedControl } from "@mantine/core";
import Login from "./Login";
import Register from "./Register";

const AuthModal = ({ opened, setOpened }) => {
	const [segmentedControlValue, setSegmentedControlValue] = useState("login");

	return (
		<Modal
			size="md"
			opened={opened}
			onClose={() => setOpened(false)}
			hideCloseButton={true}
		>
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

			{segmentedControlValue === "login" ? <Login /> : <Register />}
		</Modal>
	);
};

export default AuthModal;
