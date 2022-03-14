import "@styles/globals.css";
import {
	MantineProvider,
	NormalizeCSS,
	ColorSchemeProvider,
	GlobalStyles,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useLocalStorageValue } from "@mantine/hooks";
import { AuthProvider } from "@contexts/AuthContext";

import theme from "@config/theme";
import OpenGraphHead from "@components/shared/OpenGraphHead";

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
				<NotificationsProvider autoClose={4000} position="bottom-right">
					<AuthProvider>
						<OpenGraphHead />
						<Component {...pageProps} />
					</AuthProvider>
				</NotificationsProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
};

export default App;
