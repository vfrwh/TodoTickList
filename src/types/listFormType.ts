// 任务清单设置表单类型
export interface listFormType {
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

// Outlet上下文类型
export interface OutletContextType {
  formRef: React.MutableRefObject<{
    handleSave2: () => void;
    handleReset: () => void;
  } | null>;
}
