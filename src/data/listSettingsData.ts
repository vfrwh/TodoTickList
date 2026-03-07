export interface ListSettings {
  defaultPriority: "high" | "medium" | "low";
  sortBy:
    | "createTimeDesc"
    | "createTimeAsc"
    | "priorityDesc"
    | "priorityAsc"
    | "nameAsc";
  showCompleted: boolean;
  showDescription: boolean;
  showCreateTime: boolean;
  viewMode: "list" | "card" | "compact";
}

// 任务清单设置默认值
export const defaultValues: ListSettings = {
  // 默认优先级
  defaultPriority: "medium",

  // 默认排序方式
  sortBy: "createTimeDesc",

  // 显示已完成任务
  showCompleted: true,

  // 显示任务描述
  showDescription: true,

  // 显示创建时间
  showCreateTime: true,

  // 默认视图模式
  viewMode: "list",
};

// 优先级选项
export const priorityOptions = [
  { value: "high", label: "高优先级", color: "#f5222d" },
  { value: "medium", label: "中优先级", color: "#faad14" },
  { value: "low", label: "低优先级", color: "#52c41a" },
];

// 排序选项
export const sortOptions = [
  { value: "createTimeDesc", label: "创建时间(新→旧)" },
  { value: "createTimeAsc", label: "创建时间(旧→新)" },
  { value: "priorityDesc", label: "优先级(高→低)" },
  { value: "priorityAsc", label: "优先级(低→高)" },
  { value: "nameAsc", label: "任务名称(A→Z)" },
];

// 视图模式选项
export const viewModeOptions = [
  { value: "list", label: "列表视图" },
  { value: "card", label: "卡片视图" },
  { value: "compact", label: "紧凑视图" },
];
