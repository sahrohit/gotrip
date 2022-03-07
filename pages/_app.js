import {
	MantineProvider,
	NormalizeCSS,
	ColorSchemeProvider,
	GlobalStyles,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useLocalStorageValue } from "@mantine/hooks";

import theme from "@config/theme";

const App = ({ Component, pageProps }) => {
	const [colorScheme, setColorScheme] = useLocalStorageValue({
		key: "mantine-color-scheme",
		defaultValue: "light",
	});

	const toggleColorScheme = (value) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				theme={{
					colorScheme,
					...theme,
				}}
			>
				<NormalizeCSS />
				<GlobalStyles />
				<NotificationsProvider>
					<Component {...pageProps} />
				</NotificationsProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
};

export default App;
