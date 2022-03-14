import "@styles/globals.css";
import { useEffect } from "react";
import {
	MantineProvider,
	NormalizeCSS,
	ColorSchemeProvider,
	GlobalStyles,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useLocalStorageValue } from "@mantine/hooks";
import { AuthProvider } from "@contexts/AuthContext";
import Script from "next/script";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";

import theme from "@config/theme";
import OpenGraphHead from "@components/shared/OpenGraphHead";

const App = ({ Component, pageProps }) => {
	const router = useRouter();

	const [colorScheme, setColorScheme] = useLocalStorageValue({
		key: "mantine-color-scheme",
		defaultValue: "light",
	});

	const toggleColorScheme = (value) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	useEffect(() => {
		const handleRouteChange = (url) => {
			gtag.pageview(url);
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

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
						<Script
							strategy="afterInteractive"
							src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
						/>
						<Script
							id="gtag-init"
							strategy="afterInteractive"
							dangerouslySetInnerHTML={{
								__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
							}}
						/>
						<OpenGraphHead />
						<Component {...pageProps} />
					</AuthProvider>
				</NotificationsProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
};

export default App;
