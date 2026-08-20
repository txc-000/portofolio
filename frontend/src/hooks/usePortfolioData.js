import { useEffect, useState } from "react";
import client from "../api/client";

export function usePortfolioData() {
  const [data, setData] = useState({ profile: null, experiences: [], portfolios: [] });
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    Promise.all([client.get("/profile"), client.get("/experiences"), client.get("/portfolios")])
      .then(([profileRes, experiencesRes, portfoliosRes]) => {
        setData({
          profile: profileRes.data,
          experiences: experiencesRes.data,
          portfolios: portfoliosRes.data,
        });
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return { ...data, status };
}
