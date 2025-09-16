import React from "react";
import { ShoppingCart, Package, Users, DollarSign } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { label: "Orders", value: 120, icon: <ShoppingCart size={28} />, color: "bg-pink-300" },
    { label: "Products", value: 56, icon: <Package size={28} />, color: "bg-pink-200" },
    { label: "Customers", value: 89, icon: <Users size={28} />, color: "bg-pink-300" },
    { label: "Revenue", value: "₫25,000,000", icon: <DollarSign size={28} />, color: "bg-pink-200" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl shadow-md flex items-center gap-4 ${stat.color}`}
          >
            <div className="p-3 bg-white rounded-full shadow text-pink-400 ">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT ORDERS (dummy table) */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full table-auto border text-sm">
          <thead className="bg-pink-200 text-center text-black">
            <tr>
              <th className="border px-4 py-2">Customer</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-700">
              <td className="border px-4 py-2">john@example.com</td>
              <td className="border px-4 py-2">2025-09-15</td>
              <td className="border px-4 py-2">₫500,000</td>
              <td className="border px-4 py-2 text-green-600 font-medium">Paid</td>
            </tr>
            <tr className="text-gray-700">
              <td className="border px-4 py-2">anna@example.com</td>
              <td className="border px-4 py-2">2025-09-14</td>
              <td className="border px-4 py-2">₫1,200,000</td>
              <td className="border px-4 py-2 text-yellow-600 font-medium">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
