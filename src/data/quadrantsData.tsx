// src/data/quadrantsData.ts
export const QUADRANTS_CONFIG = [
  {
    key: "title1",
    title: "紧急且重要",
    icon: "⚡",
    className: "quadrant-urgent-important",
    bgColor: "#f5222d",
    description: "立即执行",
  },
  {
    key: "title2",
    title: "重要不紧急",
    icon: "🎯",
    className: "quadrant-not-urgent-important",
    bgColor: "#fa8c16",
    description: "规划执行",
  },
  {
    key: "title3",
    title: "紧急不重要",
    icon: "⏰",
    className: "quadrant-urgent-not-important",
    bgColor: "#1890ff",
    description: "委托他人",
  },
  {
    key: "title4",
    title: "不紧急不重要",
    icon: "🗑️",
    className: "quadrant-not-urgent-not-important",
    bgColor: "#52c41a",
    description: "尽量不做",
  },
];
