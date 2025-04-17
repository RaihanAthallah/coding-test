// components/SalesCard.js

import Image from "next/image";

const SalesCard = ({ name, role, region, totalDeals, totalClients }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="px-6 py-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-500">{role}</p>
        <p className="text-gray-500">{region}</p>
        <div className="mt-4">
          <p>
            <strong>Total Deals:</strong> {totalDeals}
          </p>
          <p>
            <strong>Total Clients:</strong> {totalClients}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesCard;
