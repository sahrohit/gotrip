import { Navbar } from "@components/Navbar";
import TicketSearch from "@components/Home/TicketSearch";
import { Banner } from "@components/Home/Banner";
import dynamic from "next/dynamic";

const BookNowComponent = dynamic(() =>
	import("@components/Home/BookNowComponent")
);
const FrequentlyAsked = dynamic(() =>
	import("@components/Home/FrequentlyAsked")
);
const Footer = dynamic(() => import("@components/shared/Footer"));

export default function Home() {
	return (
		<>
			<Navbar />
			<TicketSearch />
			<Banner />
			<BookNowComponent />
			<FrequentlyAsked />
			<Footer />
		</>
	);
}
