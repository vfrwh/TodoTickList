export interface QuadrantsSettings {
  // 显示任务数量
  showTaskCount: boolean;

  // 显示任务标签
  showTaskTags: boolean;

  // 显示截止时间
  showDeadline: boolean;

  // 卡片大小
  cardSize: "small" | "medium" | "large";

  // 是否启用悬停效果
  enableHoverEffect: boolean;

  // 默认排序方式
  defaultSortBy: "default" | "priority" | "deadline" | "title";

  // 是否显示空状态提示
  showEmptyHint: boolean;
}

// 四象限设置默认值
export const defaultValues: QuadrantsSettings = {
  showTaskCount: true,
  showTaskTags: true,
  showDeadline: true,
  cardSize: "medium",
  enableHoverEffect: true,
  defaultSortBy: "default",
  showEmptyHint: true,
};

// 卡片大小选项
export const cardSizeOptions = [
  { value: "small", label: "小", height: 240 },
  { value: "medium", label: "中", height: 280 },
  { value: "large", label: "大", height: 320 },
];

// 排序选项
export const sortOptions = [
  { value: "default", label: "默认排序" },
  { value: "priority", label: "按优先级" },
  { value: "deadline", label: "按截止时间" },
  { value: "title", label: "按任务名称" },
];
