import StarField from "./components/StarField";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import Resume from "./pages/Resume";
import { Loader, ErrorState } from "./components/StateMessage";
import { usePortfolioData } from "./hooks/usePortfolioData";
import "./App.css";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
];

export default function App() {
  const { profile, experiences, portfolios, status } = usePortfolioData();

  return (
    <div className="app-shell">
      <StarField />
      <Navbar sections={SECTIONS} brand={profile?.name} ready={status === "ready"} />
      <main className="app-main">
        {status === "loading" && <Loader label="Memuat halaman..." />}
        {status === "error" && (
          <ErrorState>
            Gagal memuat data. Pastikan server backend Laravel berjalan di http://localhost:8000.
          </ErrorState>
        )}
        {status === "ready" && (
          <>
            <Home profile={profile} portfolios={portfolios} experiences={experiences} />
            <About profile={profile} experiences={experiences} />
            <Project portfolios={portfolios} />
            <Resume profile={profile} experiences={experiences} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
