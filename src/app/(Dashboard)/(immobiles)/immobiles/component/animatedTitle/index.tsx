import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const AnimatedTitle = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.h1
      ref={ref}
      initial={{ y: -150, opacity: 0 }}
      animate={{ y: inView ? 0 : -150, opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.9, delay: 0.8 }}
      className="font-serif text-6xl text-black mt-4 iphone_SE:text-center">
      Quem somos?
    </motion.h1>
  );
};
