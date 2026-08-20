import { Route, Routes } from "react-router-dom";
import StarField from "./components/StarField";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import "./App.css";

export default function App() {
  return (
    <div className="app-shell">
      <StarField />
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
