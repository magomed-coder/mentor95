import { motion } from "framer-motion";
import { workItems } from "./constants/workItems";

export default function Hero(): JSX.Element {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Слой 1: основной фон */}
      <div className="absolute inset-0 bg-[#cacdd3]" />

      {/* Слой 2: круговые градиенты с blur */}
      <div
        className="absolute left-[-20%] top-[-30%] h-[80%] w-[80%] rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 120, 80, 0.25) 0%, rgba(255, 120, 80, 0) 70%)",
        }}
      />
      <div
        className="absolute bottom-[-20%] right-[-15%] h-[70%] w-[70%] rounded-full blur-[85px]"
        style={{
          background:
            "radial-gradient(circle, rgba(80, 180, 255, 0.2) 0%, rgba(80, 180, 255, 0) 70%)",
        }}
      />
      <div
        className="absolute left-[10%] top-[30%] h-[55%] w-[55%] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(200, 130, 250, 0.2) 0%, rgba(200, 130, 250, 0) 70%)",
        }}
      />

      {/* Слой 3: фоновый полупрозрачный текст */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          className="select-none text-center font-sans text-[30vw] font-black leading-none tracking-tighter text-black opacity-[0.04] md:text-[250px]"
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
            className="text-2xl font-bold tracking-tight text-black"
          >
            MindEdge
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="cursor-pointer text-md font-medium text-black/70 transition hover:text-black"
          >
            About Us
          </motion.div>
        </nav>

        {/* Центральный блок: имя + фото + фамилия */}
        <div className="flex flex-1 items-center justify-center px-6 md:px-12">
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
            {/* Имя (слева от фото, чуть прозрачное) */}
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 0.85, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl font-black tracking-tight text-black md:text-7xl lg:text-8xl"
            >
              Александр
            </motion.h2>

            {/* Фото */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white/50 shadow-2xl md:h-80 md:w-80"
            >
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Mentor"
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Фамилия (справа от фото, чуть прозрачная) */}
            <motion.h2
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 0.85, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl font-black tracking-tight text-black md:text-7xl lg:text-8xl"
            >
              Ковальчук
            </motion.h2>
          </div>
        </div>

        {/* Блок "О менторе" — абсолютно справа вверху */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute right-6 top-24 max-w-xs text-right md:right-12 md:top-32"
        >
          <h3 className="text-lg font-semibold text-black">О менторе</h3>
          <p className="mt-2 text-sm text-black/80">
            Александр — эксперт с 10-летним опытом в трансформации мышления.
            Помог более 500 клиентам достичь целей.
          </p>
        </motion.div>

        {/* Блок "Три пункта" — абсолютно слева внизу */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-8 left-6 flex flex-col space-y-4 md:bottom-12 md:left-12"
        >
          {workItems.map((item) => (
            <div key={item.id} className="text-black">
              <span className="text-sm font-semibold text-orange-500">
                (0{item.id})
              </span>
              <h4 className="text-base font-bold">{item.title}</h4>
              <p className="text-sm text-black/70">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Кнопка CTA и фраза (внизу по центру) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col items-center justify-center pb-10 pt-4"
        >
          <button className="rounded-full bg-orange-500 px-8 py-3 text-lg font-semibold text-black transition-all hover:bg-orange-400 hover:scale-105 active:scale-95">
            Contact Me
          </button>
          <p className="mt-4 max-w-md text-center text-sm italic text-black/60">
            “Feeling stuck, but know you're meant for more?”
          </p>
        </motion.div>
      </div>
    </div>
  );
}
