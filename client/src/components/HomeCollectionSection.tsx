import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const HomeCollectionSection = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <section className="relative bg-gradient-to-b from-amber-100 via-white to-amber-50 overflow-hidden">
      <motion.div
        ref={ref}
        className="lg:w-1/2 bg-white rounded-3xl shadow-xl overflow-hidden p-8 flex items-center justify-center relative mx-auto mt-16"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
        }}
      >
      </motion.div>
    </section>
  );
};

export default HomeCollectionSection;
