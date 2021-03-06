/** @type {import('next').NextConfig} */

const withMDX = require("@next/mdx")({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [require("remark-prism")],
	},
});

const nextConfig = {
	pageExtensions: ["js", "jsx", "mdx"],
	styledComponents: true,
	swcMinify: true,
	reactStrictMode: true,
	images: {
		domains: [
			"source.unsplash.com",
			"lh3.googleusercontent.com",
			"images.unsplash.com",
		],
	},
	experimental: {
		outputStandalone: true,
	},
};

module.exports = withMDX(nextConfig);
