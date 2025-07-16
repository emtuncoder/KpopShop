import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { useDrawer } from "./contexts/DrawerContext";

export const SearchComponent = () => {
  const { openDrawer, toggleDrawer } = useDrawer();
  const isOpen = openDrawer === "search";

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (keyword.trim()) {
        axios
          .get(`http://localhost:1709/api/parentproducts?search=${keyword}`)
          .then((res) => setResults(res.data))
          .catch((err) => console.error("Search error:", err));
      } else {
        setResults([]);
      }
    }, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  return (
    <>
      <button
        onClick={() => toggleDrawer("search")}
        className="p-1 rounded-full text-foreground hover:text-pink-500 transition"
        aria-label="Open search"
      >
        <Search className="w-5 h-5" />
      </button>

      <div
        className={`fixed top-0 left-0 z-40 h-screen w-[400px] max-w-full p-4 bg-background shadow transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative">
          <h5 className="flex justify-center items-center mb-4 text-base font-semibold text-foreground">
            <Search className="w-5 h-5 mr-2.5" />
            Search Products
          </h5>

          <div className="flex px-4 py-3 rounded-md border-2 border-pink-500 overflow-hidden max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search album title..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full outline-none bg-transparent text-sm text-foreground"
            />
          </div>

          <button
            onClick={() => toggleDrawer("search")}
            className="absolute top-2.5 right-2.5 text-pink-500 hover:text-pink-600 rounded-full w-8 h-8 flex items-center justify-center"
            aria-label="Close search"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="mt-6 max-h-[60vh] overflow-y-auto">
          {results.length === 0 && keyword && (
            <p className="text-center text-muted-foreground text-sm">No results found.</p>
          )}
          <ul className="space-y-4">
            {results.map((item) => (
              <li key={item._id}>
                <Link
                  to={`/ProductDetail/${item._id}`}
                  onClick={() => toggleDrawer("search")}
                  className="flex gap-4 items-center hover:bg-pink-100 px-3 py-2 rounded-md transition"
                >
                  <img
                    src={item.images?.[0] || "/fallback.jpg"}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">{item.title}</p>
                    <p className="text-sm text-pink-600">{item.price?.toLocaleString()}₫</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
