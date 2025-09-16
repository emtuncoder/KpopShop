import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:1709/api/customers";

const CustomersAdmin = () => {
  const [customers,setCustomers] = useState([]);
  const fetchCustomers =async() =>{
    try{
      const res =await axios.get(API);
      setCustomers(res.data);
    }
    catch(err){
      console.error("Error fetching customers",err)
    }
  };
  useEffect(()=>{
    fetchCustomers();
  },[]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Customer Admin</h1>
      {/* LIST */}
      <table className="w-full mt-10 table-auto border">
        <thead className="bg-black text-left text-white"> 
          <tr>
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cus) => (
            <tr key={cus._id} className="text-black">
              <td className="border px-4 py-2">{cus.first_name}</td>
              <td className="border px-4 py-2">{cus.last_name}</td>
              <td className="border px-4 py-2">{cus.email}</td>
              <td className="border px-4 py-2">{cus.address}</td>
              <td className="border px-4 py-2">{cus.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default CustomersAdmin
