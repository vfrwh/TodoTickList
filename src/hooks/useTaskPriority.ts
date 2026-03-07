import { useMemo } from "react";

type Priority = "high" | "medium" | "low" | undefined;

export const useTaskPriority = (priority?: Priority) => {
  const config = useMemo(() => {
    switch (priority) {
      case "high":
        return { color: "error", text: "高" };
      case "medium":
        return { color: "warning", text: "中" };
      case "low":
        return { color: "success", text: "低" };
      default:
        return { color: "default", text: "普通" };
    }
  }, [priority]);

  return config;
};
