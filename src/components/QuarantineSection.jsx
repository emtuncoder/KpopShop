import { FiShield, FiTruck, FiHeadphones, FiMail } from "react-icons/fi";

const items = [
  {
    icon: <FiShield size={32} />,
    title: "100% AUTHENTIC",
    description: "KPOP MERCH only sells official products.",
  },
  {
    icon: <FiTruck size={32} />,
    title: "Safe & Fast SHIPPING",
    description: "Fast shipping in safe packaging and optimal ways.",
  },
  {
    icon: <FiHeadphones size={32} />,
    title: "Customer service",
    description: "Our Kpop master will respond quickly.",
  },
  {
    icon: <FiMail size={32} />,
    title: "Contact us",
    description: (
      <>
        We support group purchases, review product requests, etc.{" "}
        <a
          href="/pages/contact-us"
          className="text-pink-500 underline hover:text-pink-600 transition"
          target="_blank"
          rel="noreferrer"
        >
          Learn more
        </a>
      </>
    ),
  },
];

export const QuarantineSection = () => {
  return (
    <section className="w-full py-12 bg-pink-50/60 dark:bg-background border-y border-pink-100">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white/70 dark:bg-card border border-pink-100 rounded-xl p-6 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-md"
          >
            <div className="mb-4 text-pink-500">{item.icon}</div>
            <h4 className="text-md font-bold uppercase mb-2 tracking-wide text-gray-800 dark:text-foreground">
              {item.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
