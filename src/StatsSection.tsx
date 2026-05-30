import { motion, type Variants } from "framer-motion";
import { stats } from "./constants/stats";
import type { JSX } from "react";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function StatsSection(): JSX.Element {
  return (
    <section className="w-full bg-[#cacdd3] px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={fadeUpVariants}
              className="flex flex-col items-center rounded-2xl border border-black/10 bg-white/30 p-6 backdrop-blur-sm transition-all hover:bg-white/40"
            >
              <stat.icon className="mb-4 text-4xl text-orange-500" />
              <div className="text-3xl font-bold text-black">{stat.value}</div>
              <div className="text-center text-sm text-black/70">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
