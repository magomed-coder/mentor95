import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import imgUrl from "./assets/photo.avif";
import {
  FaBuilding,
  FaChartLine,
  FaGlobe,
  FaLightbulb,
  FaUniversity,
  FaHandshake,
} from "react-icons/fa";

// ---- Типы ----
type FAQItem = {
  question: string;
  answer: string;
};

// ---- Данные ----
const expertiseList = [
  {
    id: "01",
    title: "Бизнес-наставник",
    description: "Стратегическое руководство для принятия важных решений.",
  },
  {
    id: "02",
    title: "Стратег роста",
    description: "Масштабируемые системы и расширение рынка.",
  },
  {
    id: "03",
    title: "CEO-советник",
    description: "Развитие лидерских качеств и коучинг руководителей.",
  },
];

const successStories = [
  {
    title: "Финтех-компания",
    before: "Годовой доход: 2.8 млн $, команда: 24",
    after: "Годовой доход: 12.4 млн $, команда: 86",
    metric: "+340% дохода",
    industry: "Финансовые услуги",
  },
  {
    title: "Люксовый ритейл бренд",
    before: "Маржа прибыли: 12%, магазинов: 3",
    after: "Маржа прибыли: 28%, магазинов: 9",
    metric: "Рост маржи в 2.3 раза",
    industry: "Ритейл",
  },
];

const services = [
  {
    name: "Консалтинг для руководителей",
    description:
      "Индивидуальные сессии по операционной эффективности, финансам и масштабированию.",
  },
  {
    name: "Программа наставничества",
    description: "12-месячный интенсив по лидерству и стратегиям роста.",
  },
  {
    name: "VIP-консультирование",
    description: "Стратегическая поддержка по запросу в ключевые моменты.",
  },
];

const testimonials = [
  {
    quote:
      "Алекс не просто скорректировал нашу стратегию — он переосмыслил весь подход к росту. Доход удвоился за 8 месяцев.",
    name: "София Чен",
    title: "CEO, Aether Dynamics",
  },
  {
    quote:
      "Ясность и уверенность, которые дает Алекс, не имеют себе равных. Настоящий партнер.",
    name: "Маркус В.",
    title: "Основатель, Lumen Capital",
  },
  {
    quote:
      "Работа с Алексом преобразила мой стиль лидерства. Моя команда еще никогда не была сильнее.",
    name: "Елена Росси",
    title: "Управляющий директор",
  },
  {
    quote:
      "Сотрудничество с Алексом дало нам новый взгляд на бизнес. Его советы помогли увеличить прибыль на 60% за год.",
    name: "Игорь Соловьев",
    title: "COO, FinLeaders",
  },
  {
    quote:
      "Наставничество Алекса — это синтез опыта, эмпатии и стратегического мышления. Рекомендую всем, кто хочет расти.",
    name: "Анна Петрова",
    title: "СЕО, InnovateX",
  },
  {
    quote:
      "Алекс помог нам выстроить процессы и команду мечты. Теперь мы уверенно масштабируемся.",
    name: "Владимир Ким",
    title: "Основатель, ScaleUp",
  },
];

const faqs: FAQItem[] = [
  {
    question: "Для кого предназначено наставничество?",
    answer:
      "Для состоявшихся основателей, CEO и владельцев бизнеса с годовым доходом от $2 млн, которые ищут стратегический рычаг и личностное развитие лидера.",
  },
  {
    question: "Каковы временные затраты?",
    answer:
      "Обычно две 90-минутные сессии в месяц плюс асинхронная стратегическая поддержка. График настраивается индивидуально.",
  },
  {
    question: "Чем это отличается от обычного коучинга?",
    answer:
      "Никаких шаблонов. Каждый проект — это индивидуальное партнерство, сфокусированное на вашей уникальной рыночной позиции и целях.",
  },
  {
    question: "Работаете ли вы с международными клиентами?",
    answer:
      "Абсолютно. Моя практика глобальна, клиенты из Северной Америки, Европы и Азии. Все сессии проходят удаленно с высоким уровнем конфиденциальности.",
  },
];

const partners = [
  { name: "TechCorp", icon: <FaBuilding size={48} title="TechCorp" /> },
  { name: "FinLeaders", icon: <FaUniversity size={48} title="FinLeaders" /> },
  { name: "ScaleUp", icon: <FaChartLine size={48} title="ScaleUp" /> },
  {
    name: "GlobalVentures",
    icon: <FaGlobe size={48} title="GlobalVentures" />,
  },
  { name: "InnovateX", icon: <FaLightbulb size={48} title="InnovateX" /> },
  {
    name: "CapitalGroup",
    icon: <FaHandshake size={48} title="CapitalGroup" />,
  },
];

// ---- Particle Cloud (облако точек, премиум-стиль) ----
const PARTICLE_COUNT = 4000;
function generateCloudPositions(count: number) {
  // равномерно по сфере, но с небольшим "облаком" шумом
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Сферические координаты
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = 2 * Math.PI * Math.random();
    const r = 1.2 + Math.random() * 0.5; // радиус облака
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

const ParticleCloud: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const targetRot = useRef({ x: 0, y: 0 });
  const positions = useRef(generateCloudPositions(PARTICLE_COUNT));

  // Mouse interaction: плавное вращение
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetRot.current.x = y * 0.25;
      targetRot.current.y = x * 0.4;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Медленное "течение" облака
      pointsRef.current.rotation.y +=
        (targetRot.current.y - pointsRef.current.rotation.y) * 0.04 + 0.008;
      pointsRef.current.rotation.x +=
        (targetRot.current.x - pointsRef.current.rotation.x) * 0.04 + 0.003;
    }
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions.current}
      stride={3}
      frustumCulled
    >
      <PointMaterial
        transparent
        color="#111111"
        size={0.055}
        sizeAttenuation
        depthWrite={false}
        opacity={0.18}
      />
    </Points>
  );
};

const ParticleCloudScene: React.FC = () => (
  <Canvas
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 0,
    }}
    camera={{ position: [0, 0, 4.5], fov: 45 }}
  >
    <ambientLight intensity={0.5} />
    <ParticleCloud />
  </Canvas>
);

// ---- Аккордеон (без изменений) ----
const AccordionItem: React.FC<{ item: FAQItem; index: number }> = ({
  item,
  index,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-black/10 py-6 last:border-none"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left font-medium text-xl tracking-tight text-[#111111] hover:text-[#FF8C42] transition-colors"
      >
        <span>{item.question}</span>
        <span className="ml-6 text-3xl">{isOpen ? "−" : "+"}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-[#666666] leading-relaxed max-w-2xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ---- Компонент отзывов (без изменений) ----
type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

const Testimonials: React.FC<{ testimonials: Testimonial[] }> = ({
  testimonials,
}) => (
  <section
    id="testimonials"
    className="py-40 md:py-56 border-t border-black/5 overflow-hidden"
  >
    <div className="px-6 mb-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-sm uppercase tracking-wider text-[#FF6B8A] font-semibold">
          Голоса клиентов
        </span>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mt-4">
          Отзывы
        </h2>
      </motion.div>
    </div>
    <div
      className="overflow-x-auto pb-8 cursor-grab"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
      <div className="flex gap-8 px-6 w-max">
        {testimonials.map((t, idx) => (
          <motion.div
            key={t.name + t.title}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="w-[85vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0 bg-[#F5F5F3] rounded-3xl p-8 border border-black/10 shadow-sm"
          >
            <div className="text-6xl text-[#FF8C42]/30 mb-6">“</div>
            <p className="text-xl md:text-2xl font-light leading-relaxed italic">
              {t.quote}
            </p>
            <div className="mt-8">
              <p className="font-bold tracking-tight">{t.name}</p>
              <p className="text-sm text-[#666666]">{t.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ---- Главный компонент ----
const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - navHeight, behavior: "smooth" });
    }
  };

  const menuItems = [
    { label: "Главная", id: "home" },
    { label: "Обо мне", id: "about" },
    { label: "Экспертиза", id: "expertise" },
    { label: "Истории успеха", id: "success" },
    { label: "Услуги", id: "services" },
    { label: "Партнеры", id: "partners" },
    { label: "Отзывы", id: "testimonials" },
    { label: "FAQ", id: "faq" },
    { label: "Контакты", id: "contact" },
  ];

  return (
    <div className="bg-[#F5F5F3] text-[#111111] font-sans antialiased selection:bg-[#FF8C42]/20 overflow-x-hidden">
      {/* Навигация */}
      <nav className="fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 mix-blend-difference">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-xl tracking-tighter font-semibold">
            АД
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 text-white focus:outline-none"
            aria-label="Меню"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Меню-оверлей */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md"
          >
            <div className="flex flex-col items-center justify-center h-full px-6">
              <ul className="space-y-8 text-center">
                {menuItems.map((item) => (
                  <motion.li
                    key={item.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * menuItems.indexOf(item) }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-3xl md:text-5xl font-medium tracking-tight text-[#111111] hover:text-[#FF8C42] transition-colors duration-200"
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-8"
                >
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="mt-4 bg-[#111111] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#FF8C42] transition-all duration-300"
                  >
                    Забронировать звонок
                  </button>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero (home) с 3D-сценой wireframe */}
      <section id="home" className="relative h-screen w-full overflow-hidden">
        {/* Градиентные блики */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#FF8C42] rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-1/3 right-1/4 w-[35vw] h-[35vw] bg-[#FF6B8A] rounded-full blur-[140px] opacity-20" />
        </div>

        {/* Particle Cloud (облако точек, премиум-стиль) */}
        <ParticleCloudScene />

        {/* Фоновая типографика */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center items-center pointer-events-none select-none">
          <span className="text-[18vw] md:text-[15vw] font-black uppercase tracking-tighter text-[#111111] opacity-[0.08] whitespace-nowrap leading-none">
            БИЗНЕС
          </span>
          <span className="text-[18vw] md:text-[15vw] font-black uppercase tracking-tighter text-[#111111] opacity-[0.08] whitespace-nowrap leading-none -mt-8">
            НАСТАВНИК
          </span>
        </div>

        {/* Контент Hero */}
        <div className="relative z-10 h-full w-full flex items-center justify-center">
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.2, 1] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] md:w-[45%] lg:w-[38%]"
          >
            <div className="w-full max-w-md aspect-square overflow-hidden rounded-full bg-gray-200 mx-auto">
              <img
                src={imgUrl}
                alt="Алекс Джонсон"
                className="w-full h-full object-cover grayscale contrast-125"
                style={{ filter: "grayscale(100%) contrast(110%)" }}
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute right-6 md:right-12 top-1/3 md:top-1/4 lg:top-1/3 max-w-xs md:max-w-sm text-right z-20"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#111111]">
              Я — Алекс Джонсон
            </h1>
            <p className="text-[#666666] text-base md:text-lg mt-4 leading-relaxed">
              Помогаю основателям и владельцам бизнеса масштабировать компании,
              увеличивать прибыль и строить сильные команды.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute bottom-8 left-6 md:bottom-12 md:left-12 flex flex-col md:flex-row gap-4 md:gap-10 z-20"
          >
            {expertiseList.map((item) => (
              <div
                key={item.id}
                className="text-sm tracking-wide uppercase font-medium text-[#111111]/70"
              >
                ({item.id}) {item.title}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Остальные секции (полностью идентичны вашему варианту) */}
      <section id="about" className="py-40 md:py-56 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            <img
              src={imgUrl}
              alt="Алекс Джонсон"
              className="w-full h-auto object-cover grayscale contrast-125"
              style={{ filter: "grayscale(100%) contrast(110%)" }}
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FF8C42] rounded-full blur-3xl opacity-30 -z-10" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-7xl md:text-8xl font-black uppercase tracking-tighter text-[#111111]/5 mb-8 select-none">
              ОБО МНЕ
            </h2>
            <p className="text-xl md:text-2xl font-medium leading-tight tracking-tight">
              Я работаю исключительно с дальновидными основателями, которые
              отказываются довольствоваться малым.
            </p>
            <div className="h-px w-16 bg-[#FF8C42] my-8" />
            <p className="text-[#666666] leading-relaxed text-lg">
              Более десяти лет я партнёрствую с CEO быстрорастущих компаний,
              помогая им выстраивать ясность из сложности. Мой подход сочетает
              практическую операционную стратегию и радикальное развитие
              лидерства — без лишнего шума и тщеславных метрик. Только
              устойчивая прибыль, сильные команды и бизнес, который работает на
              вашу жизнь.
            </p>
          </motion.div>
        </div>
      </section>

      <section
        id="expertise"
        className="py-40 md:py-56 px-6 max-w-7xl mx-auto border-t border-black/5"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-sm uppercase tracking-wider text-[#FF8C42] font-semibold">
            Ключевые компетенции
          </span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mt-4">
            Экспертиза
          </h2>
        </motion.div>
        <div className="space-y-16">
          {expertiseList.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="grid md:grid-cols-3 gap-6 border-b border-black/10 pb-12 last:border-0"
            >
              <div className="text-4xl font-black text-[#111111]/20">
                {exp.id}
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight">
                  {exp.title}
                </h3>
              </div>
              <p className="text-[#666666] leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="success"
        className="py-40 md:py-56 px-6 max-w-7xl mx-auto border-t border-black/5"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center md:text-left"
        >
          <span className="text-sm uppercase tracking-wider text-[#FF6B8A] font-semibold">
            Осязаемые результаты
          </span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mt-4">
            Истории успеха
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-10">
          {successStories.map((story, idx) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-black/5"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold tracking-tight">
                  {story.title}
                </h3>
                <span className="text-sm bg-[#111111]/5 px-3 py-1 rounded-full">
                  {story.industry}
                </span>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#666666]">
                    До
                  </p>
                  <p className="text-lg font-mono mt-1">{story.before}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#666666]">
                    После
                  </p>
                  <p className="text-lg font-mono mt-1">{story.after}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-black/10">
                <span className="text-2xl font-black text-[#FF8C42]">
                  {story.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="services"
        className="py-40 md:py-56 px-6 max-w-7xl mx-auto border-t border-black/5"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-sm uppercase tracking-wider text-[#FF8C42] font-semibold">
            Форматы работы
          </span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mt-4">
            Услуги
          </h2>
        </motion.div>
        <div className="flex flex-col md:flex-row gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex-1 p-8 rounded-3xl border border-black/10 bg-white/30"
            >
              <h3 className="text-2xl font-bold tracking-tight">
                {service.name}
              </h3>
              <p className="text-[#666666] mt-4 leading-relaxed">
                {service.description}
              </p>
              <div className="mt-8 text-sm font-medium text-[#111111]">
                → Узнать
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="partners"
        className="py-40 md:py-56 px-6 max-w-7xl mx-auto border-t border-black/5"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="text-sm uppercase tracking-wider text-[#FF8C42] font-semibold">
            Нам доверяют
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mt-4">
            Партнеры и клиенты
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto mt-6">
            Ведущие компании, которые выбрали стратегическое наставничество
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, idx) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              <span className="text-5xl md:text-6xl mb-2 opacity-60 hover:opacity-100">
                {partner.icon}
              </span>
              <span className="mt-2 text-xs md:text-sm text-[#111111]/60 font-medium text-center">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <Testimonials testimonials={testimonials} />

      <section
        id="faq"
        className="py-40 md:py-56 px-6 max-w-4xl mx-auto border-t border-black/5"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-sm uppercase tracking-wider text-[#FF8C42] font-semibold">
            Ясность
          </span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mt-4">
            Частые вопросы
          </h2>
        </motion.div>
        <div className="divide-y divide-black/5">
          {faqs.map((faq, idx) => (
            <AccordionItem key={faq.question} item={faq} index={idx} />
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="py-40 md:py-56 px-6 border-t border-black/5"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/50 rounded-3xl p-12 md:p-20 backdrop-blur-sm border border-black/5"
          >
            <span className="text-sm uppercase tracking-wider text-[#FF6B8A] font-semibold">
              Начните диалог
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mt-6 leading-tight">
              Давайте строить ваше наследие.
            </h2>
            <p className="text-[#666666] max-w-xl mx-auto mt-6 text-lg">
              Доступно ограниченное количество мест. Назначьте конфиденциальную
              встречу.
            </p>
            <button className="mt-12 bg-[#111111] text-white px-12 py-4 rounded-full text-lg font-medium tracking-wide hover:bg-[#FF8C42] transition-all duration-300 shadow-lg hover:shadow-xl">
              Забронировать звонок
            </button>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-black/5 text-center text-sm text-[#666666]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© 2025 Алекс Джонсон — Стратегическое наставничество</span>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-[#111111]">
              LinkedIn
            </span>
            <span className="cursor-pointer hover:text-[#111111]">X</span>
            <span className="cursor-pointer hover:text-[#111111]">
              Instagram
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
