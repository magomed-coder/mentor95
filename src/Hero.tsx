import React from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaMedal, FaUsers, FaChartLine } from "react-icons/fa";
import "./Hero.css";

const stats = [
  {
    icon: <FaUserTie size={32} />, // Профессионалы
    value: "150+",
    label: "Mentors",
  },
  {
    icon: <FaMedal size={32} />, // Опыт
    value: "10+",
    label: "Years Experience",
  },
  {
    icon: <FaUsers size={32} />, // Клиенты
    value: "1000+",
    label: "Clients",
  },
  {
    icon: <FaChartLine size={32} />, // Проекты
    value: "15+",
    label: "Projects",
  },
];

const roles = [
  {
    number: "01",
    title: "Confidence Coach",
  },
  {
    number: "02",
    title: "Growth Partner",
  },
];

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Слой 2: Градиенты */}
      <div className="hero-gradient hero-gradient1" />
      <div className="hero-gradient hero-gradient2" />
      <div className="hero-gradient hero-gradient3" />

      {/* Слой 3: Фоновый текст */}
      <div className="hero-bgtext">MindEdge</div>

      {/* Слой 4: Основной контент */}
      <div className="hero-content">
        {/* Навигация */}
        <div className="hero-nav">
          <div className="hero-logo">MindEdge</div>
          <nav className="hero-menu">
            <a href="#about">About Us</a>
          </nav>
        </div>

        {/* Главный заголовок */}
        <motion.h1
          className="hero-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Mindset Mentor
        </motion.h1>

        {/* Роли */}
        <div className="hero-roles">
          {roles.map((role, i) => (
            <motion.div
              className="hero-role"
              key={role.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
            >
              <span className="hero-role-number">({role.number})</span>{" "}
              {role.title}
            </motion.div>
          ))}
        </div>

        {/* Описание */}
        <motion.p
          className="hero-desc"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          150+ профессионалов, объединённых страстью к развитию и поддержке. Мы
          помогаем раскрыть потенциал, повысить уверенность и достичь новых
          высот.
        </motion.p>

        {/* Статистика */}
        <div className="hero-stats">
          {stats.map((stat, i) => (
            <motion.div
              className="hero-stat"
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 + i * 0.1 }}
            >
              <div className="hero-stat-icon">{stat.icon}</div>
              <div className="hero-stat-value">{stat.value}</div>
              <div className="hero-stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          className="hero-cta"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          Contact Me
        </motion.button>
        <motion.div
          className="hero-cta-caption"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          Feeling stuck, but know you're meant for more?
        </motion.div>
      </div>
    </section>
  );
}
