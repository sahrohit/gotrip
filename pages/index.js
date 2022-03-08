import FrequentlyAsked from "@components/Home/FrequentlyAsked";
import { Navbar } from "@components/Navbar";
import { Footer } from "@components/shared/Footer";
import { BookNowComponent } from "@components/Home/BookNowComponent";
import { Banner } from "@components/Home/Banner";
import TicketSearch from "@components/Home/TicketSearch";

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
