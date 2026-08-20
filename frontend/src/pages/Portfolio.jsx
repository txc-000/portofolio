import { useEffect, useState } from "react";
import client from "../api/client";
import PortfolioCard from "../components/PortfolioCard";
import { Loader, ErrorState, EmptyState } from "../components/StateMessage";

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    client
      .get("/portfolios")
      .then((res) => {
        setPortfolios(res.data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <Loader label="Memuat portofolio..." />;
  if (status === "error")
    return (
      <ErrorState>
        Gagal memuat portofolio. Pastikan server backend Laravel berjalan di http://localhost:8000.
      </ErrorState>
    );
  if (portfolios.length === 0) return <EmptyState>Belum ada proyek ditambahkan.</EmptyState>;

  return (
    <section>
      <h1 className="section-title gradient-text">Portfolio</h1>
      <div className="portfolio-grid">
        {portfolios.map((portfolio) => (
          <PortfolioCard key={portfolio.id} portfolio={portfolio} />
        ))}
      </div>
    </section>
  );
}
