import React from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";

const ToggleTheme = (props) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<AnimatePresence>
			<ActionIcon
				variant="default"
				size="xl"
				onClick={() => toggleColorScheme()}
				title="Toggle color scheme"
				radius={25}
				{...props}
			>
				{colorScheme === "light" ? (
					<motion.div whileTap={{ rotate: 180 }}>
						<BsSun fontSize="20" />
					</motion.div>
				) : (
					<motion.div whileTap={{ rotate: 360 }}>
						<BsMoon fontSize="20" />
					</motion.div>
				)}
			</ActionIcon>
		</AnimatePresence>
	);
};

export default ToggleTheme;
