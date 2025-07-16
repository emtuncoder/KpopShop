import { useState } from "react";

export const ToggleComponent = () => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => setChecked(!checked);

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-pink-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-500" />
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        Remember me?
      </span>
    </label>
  );
};
