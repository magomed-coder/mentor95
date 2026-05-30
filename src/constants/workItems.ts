export interface WorkItem {
  id: number;
  title: string;
  desc: string;
}

export const workItems: WorkItem[] = [
  { id: 1, title: "Индивидуальные сессии", desc: "Персональный подход" },
  { id: 2, title: "Групповые программы", desc: "Синергия и рост" },
  { id: 3, title: "Карьерное консультирование", desc: "Стратегия успеха" },
];
