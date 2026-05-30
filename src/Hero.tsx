import { motion } from "framer-motion";
import { workItems } from "./constants/workItems";

export default function Hero(): JSX.Element {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Слой 1: круговой радиальный градиент (фон) — от центра к краям, тёмный */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, #1e1b2e, #0a0a14, #000000)",
        }}
      />

      {/* Слой 2: два размытых пятна — прижаты к левому нижнему и правому нижнему углам */}
      {/* Левое нижнее пятно (тёплое) */}
      <div
        className="absolute bottom-0 left-0 h-[40%] w-[40%] rounded-full blur-[60px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 120, 80, 0.25) 0%, rgba(255, 120, 80, 0) 70%)",
        }}
      />
      {/* Правое нижнее пятно (холодное) */}
      <div
        className="absolute bottom-0 right-0 h-[40%] w-[40%] rounded-full blur-[60px]"
        style={{
          background:
            "radial-gradient(circle, rgba(80, 180, 255, 0.25) 0%, rgba(80, 180, 255, 0) 70%)",
        }}
      />

      {/* Слой 3: фоновый полупрозрачный текст (бренд) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          className="select-none text-center font-sans text-[30vw] font-black leading-none tracking-tighter text-white opacity-[0.05] md:text-[250px]"
          style={{ letterSpacing: "-0.02em" }}
        >
          MindEdge
        </span>
      </div>

      {/* Слой 4: контент hero */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Навигация */}
        <nav className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold tracking-tight text-white drop-shadow-md"
          >
            MindEdge
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="cursor-pointer text-md font-medium text-white/80 transition hover:text-white"
          >
            О нас
          </motion.div>
        </nav>

        {/* Центральный блок: имя + фото + фамилия */}
        <div className="flex flex-1 items-center justify-center px-6 md:px-12">
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
            {/* Имя (полупрозрачное 0.5) */}
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 0.5, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl font-black tracking-tight text-white drop-shadow-lg md:text-7xl lg:text-8xl"
            >
              Александр
            </motion.h2>

            {/* Фото */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white/60 shadow-2xl md:h-80 md:w-80"
            >
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Mentor"
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Фамилия (полупрозрачная 0.5) */}
            <motion.h2
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 0.5, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl font-black tracking-tight text-white drop-shadow-lg md:text-7xl lg:text-8xl"
            >
              Ковальчук
            </motion.h2>
          </div>
        </div>

        {/* Блок "О менторе" — абсолютно справа вверху (без карточки, просто текст) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute right-6 top-24 max-w-xs text-right md:right-12 md:top-32"
        >
          <h3 className="text-lg font-semibold text-white">О менторе</h3>
          <p className="mt-2 text-sm text-white/80">
            Александр — эксперт с 10-летним опытом в трансформации мышления.
            Помог более 500 клиентам достичь целей.
          </p>
        </motion.div>

        {/* Блок "Три пункта" — абсолютно слева внизу, без карточки, номер в строку с заголовком */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-8 left-6 flex flex-col space-y-6 md:bottom-12 md:left-12"
        >
          {workItems.map((item) => (
            <div key={item.id} className="text-white">
              <div className="flex flex-wrap items-baseline">
                <div className="w-8">
                  <span className="text-sm font-semibold text-orange-300">
                    (0{item.id})
                  </span>
                </div>
                <h4 className="text-base font-bold">{item.title}</h4>
              </div>
              <p className="mt-1 text-sm text-white/70 pl-0 md:pl-8">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
