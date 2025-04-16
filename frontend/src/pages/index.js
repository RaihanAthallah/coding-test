"use client";

import { useChart } from "./_app";
import Image from "next/image";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Home() {
  const { summary, showChart, setShowChart, loading, salesData } = useChart();

  return (
    <div className={`min-h-screen grid grid-cols-1 ${showChart ? "sm:grid-cols-2" : ""} px-6 py-12 sm:px-20 gap-16 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
      <main className="flex flex-col items-center sm:items-start gap-8">
        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />

        <ol className="list-decimal text-sm sm:text-base text-center sm:text-left space-y-2 mx-8 max-w-sm">
          <li>See The Sales Data.</li>
          <li>Interact with the chatbot to analyze Sales Data.</li>
        </ol>

        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => setShowChart(true)} className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-full text-sm sm:text-base font-medium shadow transition">
            <div className="flex items-center gap-2">
              <Image src="/vercel.svg" alt="Vercel logomark" width={20} height={20} className="dark:invert" />
              See the Sales Data
            </div>
          </button>
          <a
            href="/chatbot"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900 px-5 py-2.5 rounded-full text-sm sm:text-base font-medium shadow transition"
          >
            Chatbot
          </a>
        </div>
      </main>

      {showChart && (
        <div className="w-full h-full flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Sales Deal Summary</h2>
          {loading ? (
            <p>Loading sales data...</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
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
          )}
        </div>
      )}

    </div>
  );
}
