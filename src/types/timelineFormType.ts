import type { TimelineSettings } from "@/data/timelineSettingsData";

// 时间线设置表单类型
export type timelineFormType = TimelineSettings;

// Outlet上下文类型
export interface OutletContextType {
  formRef: React.MutableRefObject<{
    handleSave2: () => void;
    handleReset: () => void;
  } | null>;
}
