export interface TaskItem {
  id: number;
  title: string;
  priority: "urgent" | "high" | "medium" | "low";
  deadline?: string;
  status: "pending" | "completed";
  tags?: string[];
}
