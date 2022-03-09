import React, { useState, useRef } from "react";
import {
	Group,
	Popover,
	Button,
	ActionIcon,
	NumberInput,
	Anchor,
	useMantineTheme,
	Text,
} from "@mantine/core";
import { AiOutlineUser, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";

const Passgenger = () => {
	const [opened, setOpened] = useState(false);
	const [adultPassenger, setAdultPassenger] = useState(1);
	const [childPassenger, setChildPassenger] = useState(0);

	return (
		<Group>
			<Popover
				opened={opened}
				onClose={() => setOpened(false)}
				position="bottom"
				placement="start"
				withCloseButton
				title="Passengers"
				transition="scale-y"
				target={
					<Button
						variant="default"
						color="gray"
						leftIcon={<AiOutlineUser fontSize={"20px"} />}
						rightIcon={<BsChevronDown />}
						onClick={() => setOpened((o) => !o)}
					>
						{adultPassenger + childPassenger}
					</Button>
				}
			>
				<NumberSection
					value={adultPassenger}
					setValue={setAdultPassenger}
					label="Adults"
				/>
				<NumberSection
					value={childPassenger}
					setValue={setChildPassenger}
					label="Children"
					subLabel="2-12 years"
				/>
			</Popover>
		</Group>
	);
};

export default Passgenger;

const NumberSection = ({ value, setValue, label, subLabel = "" }) => {
	const ref = useRef();
	return (
		<Group position="apart" spacing={30}>
			<Group direction="column" spacing={0}>
				<Text>{label}</Text>
				<Text size="sm" color="dimmed">
					{subLabel}
				</Text>
			</Group>

			<Group spacing={5}>
				<ActionIcon variant="default" onClick={() => ref.current.decrement()}>
					<AiOutlineMinus />
				</ActionIcon>
				<NumberInput
					hideControls
					value={value}
					onChange={(val) => setValue(val)}
					handlersRef={ref}
					max={9}
					min={0}
					styles={{ input: { width: 54, textAlign: "center" } }}
				/>
				<ActionIcon variant="default" onClick={() => ref.current.increment()}>
					<AiOutlinePlus />
				</ActionIcon>
			</Group>
		</Group>
	);
};
