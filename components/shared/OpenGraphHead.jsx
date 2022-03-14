import React from "react";

const OpenGraphHead = () => {
	return (
		<>
			{/* <!-- Primary Meta Tags --> */}
			<title>GoTrip - Ticket Bookings made easy</title>
			<meta name="title" content="GoTrip - Ticket Bookings made easy" />
			<meta
				name="description"
				content="Build with love and passion. We keep the customer experience at the top of our priority. Buy tickets within minutes with hassle-free cancellation and refund. Let GoTrip worry about the tickets and plan your travel hassle-free."
			/>

			{/* <!-- Open Graph / Facebook --> */}
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://gotrip.vercel.app/" />
			<meta property="og:title" content="GoTrip - Ticket Bookings made easy" />
			<meta
				property="og:description"
				content="Build with love and passion. We keep the customer experience at the top of our priority. Buy tickets within minutes with hassle-free cancellation and refund. Let GoTrip worry about the tickets and plan your travel hassle-free."
			/>
			<meta
				property="og:image"
				content="https://gotrip.vercel.app/opengraph.png"
			/>

			{/* <!-- Twitter --> */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://gotrip.vercel.app/" />
			<meta
				property="twitter:title"
				content="GoTrip - Ticket Bookings made easy"
			/>
			<meta
				property="twitter:description"
				content="Build with love and passion. We keep the customer experience at the top of our priority. Buy tickets within minutes with hassle-free cancellation and refund. Let GoTrip worry about the tickets and plan your travel hassle-free."
			/>
			<meta
				property="twitter:image"
				content="https://gotrip.vercel.app/opengraph.png"
			/>
		</>
	);
};

export default OpenGraphHead;
