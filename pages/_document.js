import Document, { Html, Head, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...getInitialProps, ...initialProps };
	}

	render() {
		const setInitialTheme = `
      function getUserPreference() {
        if(window.localStorage.getItem('theme')) {
          return window.localStorage.getItem('theme')
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches 
          ? 'dark' 
          : 'light'
      }
      document.body.dataset.theme = getUserPreference();
    `;
		return (
			<Html>
				<Head />
				<body>
					<script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
