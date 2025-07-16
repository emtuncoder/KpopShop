import { useState } from "react";

export const QuantityBoxComponent = ({
  min = 1,
  max = 9999,
  onQuantityChange,
  

}) => {
  const [quantity, setQuantity] = useState(min);

  const handleChange = (e) => {
    const val = e.target.value;
    if (/^\d{0,5}$/.test(val)) {
      const parsed = parseInt(val);
      if (!isNaN(parsed)) {
        const safeVal = Math.max(min, Math.min(max, parsed));
        setQuantity(safeVal);
        onQuantityChange?.(safeVal);
      } else {
        setQuantity(""); // allow typing
      }
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => {
      const newQty = Math.min(Number(prev) + 1, max);
      onQuantityChange?.(newQty);
      return newQty;
    });
  };

  const handleDecrement = () => {
    setQuantity((prev) => {
      const newQty = Math.max(Number(prev) - 1, min);
      onQuantityChange?.(newQty);
      return newQty;
    });
  };

  return (
    <form className="flex flex-col justify-start pl-0.5">
      <label
        htmlFor="quantity-input"
        className="mb-2 text-sm font-medium text-pink-500 flex justify-start"
      >
        Choose quantity:
      </label>

      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          onClick={handleDecrement}
          className="bg-white border hover:bg-pink-50 border-l-pink-500 border-t-pink-500 border-b-pink-500 p-3 h-11"
        >
          <svg
            className="w-3 h-3 text-pink-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          > 
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>

        <input
          type="text"
          id="quantity-input"
          value={quantity}
          onChange={handleChange}
          className="text-center block w-full p-3 h-11 bg-white border border-b-pink-500 border-t-pink-500"
          required
        />

        <button
          type="button"
          onClick={handleIncrement}
          className="bg-white hover:bg-pink-50 border border-r-pink-500 border-t-pink-500 border-b-pink-500 p-3 h-11"
        >
          <svg
            className="w-3 h-3 text-pink-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};
