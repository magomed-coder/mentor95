import type { IconType } from "react-icons";

export interface StatItem {
  id: number;
  icon: IconType;
  value: string;
  label: string;
}

export const stats: StatItem[] = [
  { id: 1, icon: FaUsers, value: "500+", label: "Активных клиентов" },
  { id: 2, icon: FaCalendarAlt, value: "10+", label: "Лет опыта" },
  { id: 3, icon: FaStar, value: "1000+", label: "Успешных сессий" },
  { id: 4, icon: FaTrophy, value: "15+", label: "Наград и номинаций" },
];

// Импорты иконок должны быть в этом файле
import { FaUsers, FaCalendarAlt, FaStar, FaTrophy } from "react-icons/fa";
