import Footer from "@/components/Footer";
import EventList from "../components/EventList";
import Header from "../components/Header";

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <h1 className="h1-bold text-center my-8">Upcoming Events</h1>
      <h1 className="h3-semibold text-center my-8">
        Get existed! Hack The North has numerous well curated events for our
        hackers to enjoy and learn from!
      </h1>
      <hr className="mt-20 w-full border-t border-white" />
      <EventList />
      <Footer />
    </div>
  );
};

export default Home;
