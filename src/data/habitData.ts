// src/data/habitData.ts

// 习惯类型定义
export interface HabitItem {
  id: number;
  title: string;
  sign: string;
  count: number;
  total: number;
  day: number;
  percent: number;
  color: string;
  category: "健康" | "学习" | "工作" | "生活" | "运动";
  completed: boolean;
}

// 分类颜色映射
export const categoryColors = {
  健康: "#1890ff",
  学习: "#52c41a",
  工作: "#faad14",
  生活: "#f5222d",
  运动: "#722ed1",
};

// 生成模拟数据
export const generateMockHabits = (): HabitItem[] => {
  return [
    {
      id: 1,
      title: "晨间冥想",
      sign: "🧘 每天清晨10分钟",
      count: 23,
      total: 30,
      day: 23,
      percent: 77,
      color: categoryColors["健康"],
      category: "健康",
      completed: false,
    },
    {
      id: 2,
      title: "阅读30分钟",
      sign: "📚 每日阅读，持续成长",
      count: 15,
      total: 30,
      day: 15,
      percent: 50,
      color: categoryColors["学习"],
      category: "学习",
      completed: false,
    },
    {
      id: 3,
      title: "跑步5公里",
      sign: "🏃 保持健康体魄",
      count: 8,
      total: 20,
      day: 8,
      percent: 40,
      color: categoryColors["运动"],
      category: "运动",
      completed: false,
    },
    {
      id: 4,
      title: "写日记",
      sign: "📝 记录生活点滴",
      count: 18,
      total: 30,
      day: 18,
      percent: 60,
      color: categoryColors["生活"],
      category: "生活",
      completed: true,
    },
    {
      id: 5,
      title: "学习英语",
      sign: "🇬🇧 每天背单词",
      count: 12,
      total: 30,
      day: 12,
      percent: 40,
      color: categoryColors["学习"],
      category: "学习",
      completed: false,
    },
    {
      id: 6,
      title: "早睡早起",
      sign: "🌙 23:00前睡觉",
      count: 20,
      total: 30,
      day: 20,
      percent: 67,
      color: categoryColors["生活"],
      category: "生活",
      completed: false,
    },
    {
      id: 7,
      title: "喝水提醒",
      sign: "💧 每天8杯水",
      count: 25,
      total: 30,
      day: 25,
      percent: 83,
      color: categoryColors["健康"],
      category: "健康",
      completed: false,
    },
    {
      id: 8,
      title: "代码提交",
      sign: "🖥️ 每天Git提交",
      count: 19,
      total: 30,
      day: 19,
      percent: 63,
      color: categoryColors["工作"],
      category: "工作",
      completed: false,
    },
  ];
};

// 获取习惯统计信息
export const getHabitStats = (habits: HabitItem[]) => {
  return {
    totalHabits: habits.length,
    completedHabits: habits.filter((h) => h.count === h.total).length,
    totalCheckins: habits.reduce((acc, h) => acc + h.count, 0),
    activeHabits: habits.filter((h) => h.count < h.total).length,
  };
};

// 获取分类统计
export const getCategoryStats = (habits: HabitItem[]) => {
  const stats: Record<string, { total: number; completed: number }> = {};

  habits.forEach((habit) => {
    if (!stats[habit.category]) {
      stats[habit.category] = { total: 0, completed: 0 };
    }
    stats[habit.category].total += 1;
    if (habit.completed) {
      stats[habit.category].completed += 1;
    }
  });

  return stats;
};
