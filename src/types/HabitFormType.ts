import type { HabitItem } from "@/data/habitData";
import type { HabitSettings } from "@/data/habitSettingsData";

export interface HabitFormTypes {
  taskName: string;
  sign: string;
  count: number;
  category: string;
}

// 习惯设置表单类型
export type habitSettingsFormType = HabitSettings;

export interface HabitDetailsProps {
  open: boolean;
  isEdit: boolean;
  onClose: () => void;
  habitData?: HabitItem | null;
  onSave?: (data: HabitFormTypes) => void;
  defaultCategory?: string;
  defaultTargetCount?: number;
}

// Outlet上下文类型
export interface OutletContextType {
  formRef: React.MutableRefObject<{
    handleSave2: () => void;
    handleReset: () => void;
  } | null>;
}
