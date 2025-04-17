"use client";

import { useChart } from "./_app";
import Image from "next/image";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import SalesCard from "../components/card"; // Import SalesCard component
import { Bot } from "lucide-react";

export default function Home() {
  const { showChart, setShowChart, salesBio, setSalesBio, salesData, loading, error } = useChart();

  const renderSalesCards = () => {
    if (!salesBio || !Array.isArray(salesBio)) {
      return <p>No sales data available</p>;
    }

    console.log("Sales Bio:", salesBio); // Log the salesBio data for debugging

    return salesBio.map((bio) => (
      <SalesCard
        key={bio.name} // Or use `bio.id` if you have unique IDs
        name={bio.name}
        role={bio.role}
        region={bio.region}
        totalDeals={bio.total_deals}
        totalClients={bio.total_clients}
      />
    ));
  };

  return (
    <div
      className={`min-h-screen w-full px-6 py-12 sm:px-20 gap-16 bg-gray-950 text-gray-100 dark:text-gray-100 transition-all duration-700 ease-in-out 
    ${showChart ? "grid grid-cols-1 sm:grid-cols-2 items-start" : "flex items-center justify-center"}`}
    >
      {/* Left Section */}
      <main
        className={`flex flex-col items-center justify-center gap-6 w-full max-w-xl transition-all duration-700 ease-in-out
    ${showChart ? "sm:items-start sm:pt-[10vh]" : ""}`}
      >
        <div className="w-full flex flex-col items-center text-center gap-2">
          {/* Logo */}
          <Image src="/logo.png" alt="Dashboard Logo" width={200} height={200} className="object-contain" priority />

          {/* Title */}
          <h1 className="text-[36px] sm:text-[50px] font-semibold">Sales Dashboard</h1>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full justify-center items-center">
          <button
            onClick={() => setShowChart(true)}
            className="bg-cyan-600 hover:bg-cyan-700 hover:scale-105 hover:shadow-lg text-white px-5 py-2.5 rounded-full text-sm sm:text-base font-medium shadow transition-all duration-300 ease-in-out w-full sm:w-auto"
          >
            See the Sales Data
          </button>
          <a
            href="/chatbot"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900 hover:scale-105 hover:shadow-lg px-5 py-2.5 rounded-full text-sm sm:text-base font-medium shadow transition-all duration-300 ease-in-out w-full sm:w-auto text-center flex items-center justify-center gap-2"
          >
            <Bot className="w-5 h-5" />
            Chatbot
          </a>
        </div>
      </main>

      {/* Right Section: Chart */}
      {showChart && (
        <div className="w-full h-full flex flex-col items-center sm:items-start gap-6">
          <h2 className="text-xl font-semibold text-center sm:text-left">Sales Deal Summary</h2>

          {loading ? (
            <p>Loading sales data...</p>
          ) : (
            <>
              {/* Bar Chart */}
              <div className="w-full h-[400px] max-w-2xl bg-gray-950 rounded-xl p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData} style={{ backgroundColor: "#0a0a0a" }}>
                    {" "}
                    {/* Tailwind's bg-gray-950 = #0a0a0a */}
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", color: "#fff" }} />
                    <Legend wrapperStyle={{ color: "#fff" }} />
                    <Bar dataKey="Closed Won" fill="#22c55e" />
                    <Bar dataKey="In Progress" fill="#3b82f6" />
                    <Bar dataKey="Closed Lost" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Table View */}
              <div className="overflow-x-auto w-full max-w-2xl">
                <table className="min-w-full text-sm text-left border-separate border-spacing-0 rounded-xl overflow-hidden shadow-md">
                  <thead>
                    <tr className="bg-cyan-500 text-white">
                      <th className="px-6 py-3 text-left font-semibold">Sales Rep</th>
                      <th className="px-6 py-3 text-left font-semibold">Closed Won</th>
                      <th className="px-6 py-3 text-left font-semibold">In Progress</th>
                      <th className="px-6 py-3 text-left font-semibold">Closed Lost</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-950 dark:bg-gray-950 text-gray-200 dark:text-gray-100">
                    {salesData.map((row, idx) => (
                      <tr key={idx} className={`transition-colors duration-200 ${idx % 2 === 0 ? "bg-gray-900 dark:bg-gray-900" : ""} hover:bg-cyan-100 dark:hover:bg-gray-800`}>
                        <td className="px-6 py-3 border-t border-gray-600 dark:border-gray-700 rounded-l-xl">{row.name}</td>
                        <td className="px-6 py-3 border-t border-gray-600 dark:border-gray-700 text-green-600">{row["Closed Won"]}</td>
                        <td className="px-6 py-3 border-t border-gray-600 dark:border-gray-700 text-blue-600">{row["In Progress"]}</td>
                        <td className="px-6 py-3 border-t border-gray-600 dark:border-gray-700 text-red-600 rounded-r-xl">{row["Closed Lost"]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Sales Cards Section */}
              <div className="flex flex-wrap gap-6 justify-center sm:justify-start">{renderSalesCards()}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
