import type { HabitItem } from "@/data/habitData";

export interface HabitFormTypes {
  taskName: string;
  sign: string;
  count: number;
  category: string;
}

export interface HabitDetailsProps {
  open: boolean;
  isEdit: boolean;
  onClose: () => void;
  habitData?: HabitItem | null;
  onSave?: (data: HabitFormTypes) => void;
}
