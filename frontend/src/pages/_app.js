import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export function useChart() {
  const [showChart, setShowChart] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/sales");
        const json = await response.json();
        setSalesData(transformData(json));
      } catch (error) {
        console.error("Failed to fetch sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (showChart) {
      fetchSalesData();
    }
  }, [showChart]);

  const transformData = (data) => {
    if (!data?.salesReps) return [];
    return data.salesReps.map((rep) => {
      const summary = {
        name: rep.name,
        "Closed Won": 0,
        "In Progress": 0,
        "Closed Lost": 0,
      };
      rep.deals.forEach((deal) => {
        summary[deal.status] += deal.value;
      });
      return summary;
    });
  };

  return { showChart, setShowChart, salesData, loading };
}
