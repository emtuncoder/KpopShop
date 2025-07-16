import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-pink-100 dark:bg-gray-900 p-4">
        <h2 className="text-xl font-bold mb-4 text-white">Admin Panel</h2>
        <nav className="flex flex-col gap-2 text-white">
          <Link to="/admin/products">Products</Link>
          <Link to="/admin/categories">Categories</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/customers">Customers</Link>
          <Link to="/admin/parentproducts">Parent Product</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-white dark:bg-background text-black dark:text-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
