"use client";

import { useChart } from "./_app";
import Image from "next/image";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import SalesCard from "../components/card"; // Import SalesCard component

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
    <div className={`min-h-screen grid grid-cols-1 ${showChart ? "sm:grid-cols-2" : ""} px-6 py-12 sm:px-20 gap-16 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
      {/* Left Section */}
      <main className={`flex flex-col items-center gap-8 w-full max-w-xl mx-auto sm:items-start sticky top-0 transition-all duration-700 ease-in-out ${showChart ? "pt-[50%]" : "pt-0"}`}>
        <div className="w-full flex justify-center sm:justify-start">
          <h1 className="text-[50px] font-semibold">SALES DASHBOARD</h1>
        </div>

        {/* Instructions */}
        <ol className="list-decimal text-sm ml-4 sm:text-base sm:text-left space-y-2 px-4 sm:px-0 max-w-sm w-full">
          <li>See The Sales Data.</li>
          <li>Interact with the chatbot to analyze Sales Data.</li>
        </ol>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center sm:justify-start">
          <button onClick={() => setShowChart(true)} className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-full text-sm sm:text-base font-medium shadow transition w-full sm:w-auto ">
            See the Sales Data
          </button>
          <a
            href="/chatbot"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900 px-5 py-2.5 rounded-full text-sm sm:text-base font-medium shadow transition w-full sm:w-auto text-center"
          >
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
              <div className="w-full h-[300px] max-w-2xl">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Closed Won" fill="#22c55e" />
                    <Bar dataKey="In Progress" fill="#3b82f6" />
                    <Bar dataKey="Closed Lost" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Table View */}
              <div className="overflow-x-auto w-full max-w-2xl">
                <table className="min-w-full text-sm text-left border border-gray-200 dark:border-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-2 border">Sales Rep</th>
                      <th className="px-4 py-2 border">Closed Won</th>
                      <th className="px-4 py-2 border">In Progress</th>
                      <th className="px-4 py-2 border">Closed Lost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                        <td className="px-4 py-2 border">{row.name}</td>
                        <td className="px-4 py-2 border text-green-600">{row["Closed Won"]}</td>
                        <td className="px-4 py-2 border text-blue-600">{row["In Progress"]}</td>
                        <td className="px-4 py-2 border text-red-600">{row["Closed Lost"]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Sales Cards Section */}
          <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
            {renderSalesCards()} {/* Render the sales cards */}
          </div>
        </div>
      )}
    </div>
  );
}
