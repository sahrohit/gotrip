import { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import {
	PasswordInput,
	Progress,
	Text,
	Popover,
	Box,
	Button,
} from "@mantine/core";
import { useAuth } from "@contexts/AuthContext";

function PasswordRequirement({ meets = "teal", label = "passowrd" }) {
	return (
		<Text
			color={meets ? "teal" : "red"}
			sx={{ display: "flex", alignItems: "center" }}
			mt={7}
			size="sm"
		>
			{meets ? <AiOutlineCheck /> : <AiOutlineClose />}{" "}
			<Box ml={10}>{label}</Box>
		</Text>
	);
}

const requirements = [
	{ re: /[0-9]/, label: "Includes number" },
	{ re: /[a-z]/, label: "Includes lowercase letter" },
	{ re: /[A-Z]/, label: "Includes uppercase letter" },
	{ re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password) {
	let multiplier = password.length > 5 ? 0 : 1;

	requirements.forEach((requirement) => {
		if (!requirement.re.test(password)) {
			multiplier += 1;
		}
	});

	return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export default function PasswordStrength() {
	const { setAuthModalOpened } = useAuth();

	const [popoverOpened, setPopoverOpened] = useState(false);
	const [value, setValue] = useState("");
	const checks = requirements.map((requirement, index) => (
		<PasswordRequirement
			key={index}
			label={requirement.label}
			meets={requirement.re.test(value)}
		/>
	));

	const strength = getStrength(value);
	const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

	return (
		<>
			<Popover
				opened={popoverOpened}
				position="bottom"
				placement="start"
				withArrow
				styles={{ popover: { width: "100%" } }}
				noFocusTrap={true}
				transition="pop-top-left"
				onFocusCapture={() => setPopoverOpened(true)}
				onBlurCapture={() => setPopoverOpened(false)}
				target={
					<PasswordInput
						required
						label="Your password"
						placeholder="Your password"
						description="Strong password should include letters in lower and uppercase, at least 1 number, at least 1 special symbol"
						value={value}
						onChange={(event) => setValue(event.currentTarget.value)}
						onFocus={() => {
							console.log("Password Field Focused");
						}}
						onBlur={() => {
							console.log("Password Field Blurred");
						}}
					/>
				}
			>
				<Progress
					color={color}
					value={strength}
					size={5}
					style={{ marginBottom: 10 }}
				/>
				<PasswordRequirement
					label="Includes at least 6 characters"
					meets={value.length > 5}
				/>
				{checks}
			</Popover>

			<Button onClick={() => setAuthModalOpened(true)}>Login</Button>
		</>
	);
}
