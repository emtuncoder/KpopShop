import { useEffect, useState } from "react";
import { cn } from "../libs/utils";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/assets/images/slides/banner1.webp",
  "/assets/images/slides/banner2.webp",
  "/assets/images/slides/banner3.webp",
  "/assets/images/slides/banner4.webp",
];

export const SlidebarComponent = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-xl">
      <div className="relative w-full h-full">
        <AnimatePresence initial={false}>
          <motion.img
            key={images[current]}
            src={images[current]}
            alt={`Slide ${current}`}
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Optional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* Optional animated caption */}
        <div className="absolute bottom-10 left-10 text-white">
          <motion.h2
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg"
          >
          </motion.h2>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <motion.div
            key={index}
            onClick={() => setCurrent(index)}
            whileTap={{ scale: 0.8 }}
            className={cn(
              "w-3 h-3 rounded-full cursor-pointer border border-white/70",
              current === index
                ? "bg-pink-500 shadow-md"
                : "bg-white/40 hover:bg-white/70 transition"
            )}
          />
        ))}
      </div>
    </div>
  );
};
