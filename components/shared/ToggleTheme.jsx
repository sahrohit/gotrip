import React from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";

const ToggleTheme = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<ActionIcon
			variant="outline"
			size="lg"
			onClick={() => toggleColorScheme()}
			title="Toggle color scheme"
		>
			{colorScheme === "light" ? <BsSun /> : <BsMoon />}
		</ActionIcon>
	);
};

export default ToggleTheme;
