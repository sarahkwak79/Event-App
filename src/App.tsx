import { Routes, Route } from "react-router-dom";
import "./globals.css";
import Home from "./pages/Home";
import { AuthProvider } from "./components/Auth";
import LoginPage from "./pages/LoginPage";
import EventPage from "./pages/EventPage";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/event/:eventId" element={<EventPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
