import { Navbar } from "@components/Navbar/index";
import TicketSearch from "@components/Home/TicketSearch";
import { Banner } from "@components/Home/Banner";
import dynamic from "next/dynamic";
import FadeInWhenVisible from "@components/shared/FadeInWhenVisible";
import { AnimatePresence } from "framer-motion";

const BookNowComponent = dynamic(() =>
	import("@components/Home/BookNowComponent")
);
const FrequentlyAsked = dynamic(() =>
	import("@components/Home/FrequentlyAsked")
);
const Footer = dynamic(() => import("@components/shared/Footer"));

export default function About() {
	return (
		<AnimatePresence>
			<Navbar />
		</AnimatePresence>
	);
}
