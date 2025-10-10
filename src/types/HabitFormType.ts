export interface HabitDetailsProps {
  open: boolean;
  isEdit: boolean;
  onClose: () => void;
}

export interface HabitFormTypes {
  id?: number;
  taskName: string;
  priority:string;
  date:string;
}