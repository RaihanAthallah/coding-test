import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export function useChart() {
  const [showChart, setShowChart] = useState(false);
  const [salesBio, setSalesBio] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/sales");
        const json = await response.json();

        setSalesData(transformData(json));
        setSalesBio(sales(json));

        setError(null);
      } catch (err) {
        console.error("Failed to fetch sales data:", err);
        const errorMessage = "Failed to fetch sales data.";
        setError(errorMessage);
        toast.error(errorMessage); // ✅ Show toast notification
      } finally {
        setLoading(false);
      }
    };

    if (showChart) {
      fetchSalesData();
    }
  }, [showChart]);

  const transformData = (data) => {
    if (!data?.data.salesReps) return [];
    return data.data.salesReps.map((rep) => {
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

  const sales = (data) => {
    const salesMap = [];

    if (!data || !Array.isArray(data.data.salesReps)) {
      return salesMap; // return empty map if salesReps is undefined or not an array
    }

    data.data.salesReps.forEach((rep) => {
      salesMap[rep.id] = {
        name: rep.name,
        role: rep.role,
        region: rep.region,
        total_deals: rep.deals?.length || 0,
        total_clients: rep.clients?.length || 0,
      };
    });

    console.log("Sales Map:", salesMap); // Log the salesMap to see its structure

    return salesMap;
  };

  return { showChart, setShowChart, salesBio, setSalesBio, salesData, loading, error };
}
