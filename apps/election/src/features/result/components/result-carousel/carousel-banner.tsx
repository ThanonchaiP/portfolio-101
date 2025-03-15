import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export const CarouselBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0 }}
          initial={{ top: "-44px", opacity: 0 }}
          animate={{ top: "54px", opacity: 1 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="absolute inset-x-0 bottom-0 text-center"
        >
          <Image
            alt="coalition-parties-sign"
            src="/coalition-parties-sign.svg"
            width={540}
            height={143}
            className="mx-auto w-full max-w-[540px]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
