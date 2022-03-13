import React from "react";
import { Center, Loader } from "@mantine/core";

const FullPageLoadingSpinner = () => {
	return (
		<Center
			sx={(theme) => ({
				width: "100%",
				height: "100vh",
			})}
		>
			<Loader variant="bars" />
		</Center>
	);
};

export default FullPageLoadingSpinner;
