import { Text, Box, Transition, useMantineColorScheme } from "@mantine/core";
import React from "react";
import { useState, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const Logo = () => {
	const MotionBox = motion(Box);
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<AnimatePresence>
			<Link href="/" passHref>
				<MotionBox
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					height="50px"
					width="100px"
					mt={8}
				>
					<Image
						height="50px"
						width="100px"
						src={colorScheme === "dark" ? "/logo_dark.png" : "/logo_light.png"}
						alt="Logo"
					/>
				</MotionBox>
			</Link>
		</AnimatePresence>
	);
};

export default memo(Logo);
