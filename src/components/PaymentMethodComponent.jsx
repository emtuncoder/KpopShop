import React, { useState } from "react";

const PaymentMethodComponent = () => {
  const [selectedOption, setSelectedOption] = useState("option2");

  return (
    <div className="flex justify-evenly pt-5">
      {/* Momo Option */}
      <div className="flex items-center gap-2">
        <img
          className="w-20 h-20"
          src="/assets/images/payment/momo.png"
          alt="Momo"
        />
        <input
          id="radio-1"
          type="radio"
          value="option1"
          name="radio-group"
          checked={selectedOption === "option1"}
          onChange={() => setSelectedOption("option1")}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 
                     dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 
                     dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      {/* VNPay Option */}
      <div className="flex items-center gap-2">
        <img
          className="w-20 h-20 rounded-full"
          src="/assets/images/payment/vnpay.jpg"
          alt="VNPay"
        />
        <input
          id="radio-2"
          type="radio"
          value="option2"
          name="radio-group"
          checked={selectedOption === "option2"}
          onChange={() => setSelectedOption("option2")}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 
                     dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 
                     dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
    </div>
  );
};

export default PaymentMethodComponent;
