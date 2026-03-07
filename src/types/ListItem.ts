export interface ListItem {
  id: number;
  name: string;
  avatar?: string;
  description: string;
  priority?: "high" | "medium" | "low";
  status?: "pending" | "completed";
  createTime?: string;
}
