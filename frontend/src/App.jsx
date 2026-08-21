import StarField from "./components/StarField";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import Resume from "./pages/Resume";
import { usePortfolioData } from "./hooks/usePortfolioData";
import "./App.css";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
];

export default function App() {
  const { profile, experiences, portfolios } = usePortfolioData();

  return (
    <div className="app-shell">
      <StarField />
      <Navbar sections={SECTIONS} brand={profile?.name} ready />
      <main className="app-main">
        <Home profile={profile} portfolios={portfolios} experiences={experiences} />
        <About profile={profile} experiences={experiences} />
        <Project portfolios={portfolios} />
        <Resume profile={profile} experiences={experiences} />
      </main>
      <Footer />
    </div>
  );
}
