/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	reactStrictMode: true,
	images: {
		domains: [
			"source.unsplash.com",
			"lh3.googleusercontent.com",
			"images.unsplash.com",
		],
	},
};

module.exports = nextConfig;
