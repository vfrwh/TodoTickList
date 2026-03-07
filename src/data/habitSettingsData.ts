export interface HabitSettings {
  // 默认目标次数
  defaultTargetCount: number;

  // 默认分类
  defaultCategory: "健康" | "学习" | "工作" | "生活" | "运动";

  // 是否显示统计卡片
  showStatsCard: boolean;

  // 卡片布局方式
  cardLayout: "grid" | "list";

  // 每行显示卡片数（grid模式下）
  cardsPerRow: 2 | 3 | 4;

  // 是否显示进度条
  showProgressBar: boolean;

  // 是否显示连续天数
  showStreak: boolean;

  // 是否显示完成率
  showCompletionRate: boolean;

  // 打卡后自动增加天数
  autoIncrementStreak: boolean;

  // 允许补打卡
  allowCatchUp: boolean;

  // 提醒时间
  reminderTime?: string;

  // 是否启用提醒
  enableReminder: boolean;
}

// 习惯设置默认值
export const defaultValues: HabitSettings = {
  defaultTargetCount: 30,
  defaultCategory: "健康",
  showStatsCard: true,
  cardLayout: "grid",
  cardsPerRow: 3,
  showProgressBar: true,
  showStreak: true,
  showCompletionRate: true,
  autoIncrementStreak: true,
  allowCatchUp: false,
  enableReminder: false,
  reminderTime: "09:00",
};

// 分类选项
export const categoryOptions = [
  { value: "健康", label: "健康", color: "#1890ff" },
  { value: "学习", label: "学习", color: "#52c41a" },
  { value: "工作", label: "工作", color: "#faad14" },
  { value: "生活", label: "生活", color: "#f5222d" },
  { value: "运动", label: "运动", color: "#722ed1" },
];

// 卡片布局选项
export const cardLayoutOptions = [
  { value: "grid", label: "网格布局" },
  { value: "list", label: "列表布局" },
];

// 每行卡片数选项
export const cardsPerRowOptions = [
  { value: 2, label: "2列" },
  { value: 3, label: "3列" },
  { value: 4, label: "4列" },
];
