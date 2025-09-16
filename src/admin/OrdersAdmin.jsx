import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:1709/api/orders";

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);


  const fetchOrders = async () => {
    try {
      const res = await axios.get(API);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Orders Admin</h1>
      {/* LIST */}
      <table className="w-full mt-10 table-auto border">
        <thead className="bg-black text-left text-white">
          <tr>
            <th className="border px-4 py-2">Customer Email</th>
            <th className="border px-4 py-2">Customer Name</th>
            <th className="border px-4 py-2">Order Date</th>
            <th className="border px-4 py-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((ords) => (
            <tr key={ords._id} className="text-black">
              <td className="border px-4 py-2">{ords.customer?.email}</td>
              <td className="border px-4 py-2">{ords.customer?.first_name}</td>
              <td className="border px-4 py-2">{ords.order_date}</td>
              <td className="border px-4 py-2">{ords.total_price?.toLocaleString()}₫</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersAdmin;
