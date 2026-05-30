import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Слой 1: основной фон */}
      <div className="absolute inset-0 bg-[#cbcfd4]" />

      {/* Слой 2: два размытых градиентных пятна — прижаты к нижним углам, размером до центра */}
      <div
        className="absolute bottom-0 left-0 h-[50%] w-[50%] rounded-full blur-[60px]"
        style={{
          background:
            "radial-gradient(circle, rgba(203, 111, 47, 0.35) 0%, rgba(203, 111, 47, 0) 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[50%] w-[50%] rounded-full blur-[60px]"
        style={{
          background:
            "radial-gradient(circle, rgba(222, 151, 150, 0.35) 0%, rgba(222, 151, 150, 0) 70%)",
        }}
      />

      {/* Слой 3: фоновый текст удалён по просьбе */}

      {/* Слой 4: контент hero */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Хедер */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-6 md:px-12 md:py-8"
        >
          <div className="flex items-center gap-2 text-lg font-semibold tracking-tight text-black drop-shadow-sm">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[#cb6f2f]"
            >
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              <line x1="12" y1="22" x2="12" y2="15.5" />
              <polyline points="22 8.5 12 15.5 2 8.5" />
            </svg>
            MindEdge
          </div>
          <div className="flex items-center gap-6">
            <button className="flex flex-col gap-1.5 p-2 group">
              <span className="block h-0.5 w-6 bg-black transition-transform group-hover:translate-x-1"></span>
              <span className="block h-0.5 w-6 bg-black transition-transform group-hover:-translate-x-1"></span>
            </button>
          </div>
        </motion.header>

        {/* Список ролей слева */}
        <motion.div
          className="absolute bottom-[12%] left-[5%] md:left-[8%] z-20 space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            "(01) Ментальный наставник",
            "(02) Коуч уверенности",
            "(03) Партнёр по росту",
          ].map((role, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="text-base md:text-lg font-medium italic text-black drop-shadow-sm"
            >
              {role}
            </motion.div>
          ))}
        </motion.div>

        {/* Текст справа */}
        <motion.div
          className="absolute top-[28%] right-[6%] md:right-[14%] z-20 max-w-75"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg md:text-xl font-semibold italic text-black drop-shadow-sm mb-2">
            Я Дэвид Миллер!
          </h2>
          <p className="text-sm md:text-base text-black/70 leading-relaxed text-right md:text-left">
            Помогаю высокоэффективным людям преодолеть ментальные барьеры,
            построить внутреннюю силу и создать жизнь, которую они заслуживают.
          </p>
        </motion.div>

        {/* Центральный блок: имя + фото + фамилия (теперь Дэвид Миллер, полупрозрачные) */}
        <div className="flex flex-1 items-center justify-center px-6 md:px-12">
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 0.5, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl font-black tracking-tight text-black drop-shadow-sm md:text-7xl lg:text-8xl"
            >
              Дэвид
            </motion.h2>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white/60 shadow-2xl md:h-80 md:w-80"
            >
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Дэвид Миллер"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 0.5, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl font-black tracking-tight text-black drop-shadow-sm md:text-7xl lg:text-8xl"
            >
              Миллер
            </motion.h2>
          </div>
        </div>
      </div>
    </div>
  );
}
