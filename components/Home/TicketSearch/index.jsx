import {
	Container,
	Group,
	Input,
	NativeSelect,
	Select,
	Paper,
	Button,
	Popover,
	ActionIcon,
	Text,
	useMantineTheme,
	Anchor,
	NumberInput,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import React, { useState, useRef } from "react";
import { VscArrowSwap, VscArrowRight } from "react-icons/vsc";
import { AiOutlineUser } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import Passgenger from "./Passgenger";

const TicketSearch = () => {
	const [value, toggle] = useToggle("one-way", ["one-way", "two-way"]);

	return (
		<Paper
			size="xl"
			padding="xl"
			withBorder
			sx={(theme) => ({
				marginLeft: theme.spacing.xl * 4,
				marginRight: theme.spacing.xl * 4,
				borderRadius: theme.radius.md,
				boxShadow: theme.shadows.lg,
			})}
		>
			<Group my={10}>
				<Select
					icon={value === "one-way" ? <VscArrowRight /> : <VscArrowSwap />}
					data={[
						{ value: "one-way", label: "One Way" },
						{ value: "two-way", label: "Two Way" },
					]}
					value={value}
					variant="filled"
					onChange={(val) => toggle(val)}
				/>
				<Passgenger />
				<Select
					data={[
						{ value: "sl", label: "Sleeper (SL)" },
						{ value: "3a", label: "AC 3 Tier (3A)" },
						{ value: "2a", label: "AC 2 Tier (2A)" },
						{ value: "1a", label: "AC First Class (1A)" },
					]}
					defaultValue="sl"
					variant="filled"
				/>
			</Group>
			<Group position="apart" align="center">
				<Input />
				<Input />
				<Input />
				<Input />
			</Group>
		</Paper>
	);
};

export default TicketSearch;
