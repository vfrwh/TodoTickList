export const DragItemTypes = {
  TASK: "task",
};

export interface DragTaskItem {
  id: string | number;
  date: string;
  content: string;
  type: string;
  priority?: string;
  tags?: string[];
}
