export interface TimelineSettings {
  // 是否显示底部统计
  showFooterStats: boolean;

  // 任务显示数量限制
  maxTasksPerDay: number;

  // 是否显示任务标签
  showTaskTags: boolean;

  // 是否启用工具提示
  enableTooltip: boolean;

  // 任务颜色方案
  taskColorScheme: "status" | "priority";

  // 是否允许拖拽
  allowDrag: boolean;
}

// 时间线设置默认值
export const defaultValues: TimelineSettings = {
  showFooterStats: true,
  maxTasksPerDay: 3,
  showTaskTags: true,
  enableTooltip: true,
  taskColorScheme: "status",
  allowDrag: true,
};

// 任务颜色方案选项
export const colorSchemeOptions = [
  { value: "status", label: "按状态" },
  { value: "priority", label: "按优先级" },
];

// 任务数量限制选项
export const maxTasksOptions = [
  { value: 2, label: "2个" },
  { value: 3, label: "3个" },
  { value: 5, label: "5个" },
  { value: 10, label: "10个" },
  { value: 0, label: "无限制" },
];
