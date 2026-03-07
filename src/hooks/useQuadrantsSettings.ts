import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { type TaskItem } from "@/types/taskItem";
import { defaultValues } from "@/data/quadrantsSettingsData";

export const useQuadrantsSettings = () => {
  // 确保从 Redux 获取设置，如果不存在则使用默认值
  const settings = useSelector((state: RootState) => {
    return state.quadrants?.defaultValues || defaultValues;
  });

  // 根据设置处理任务列表
  const processTasks = (tasks: TaskItem[]) => {
    if (!tasks) return [];

    const processed = [...tasks];

    // 根据默认排序方式排序
    if (settings.defaultSortBy === "priority") {
      const priorityWeight = { urgent: 4, high: 3, medium: 2, low: 1 };
      processed.sort(
        (a, b) =>
          (priorityWeight[b.priority as keyof typeof priorityWeight] || 0) -
          (priorityWeight[a.priority as keyof typeof priorityWeight] || 0),
      );
    } else if (settings.defaultSortBy === "deadline") {
      processed.sort((a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return a.deadline.localeCompare(b.deadline);
      });
    } else if (settings.defaultSortBy === "title") {
      processed.sort((a, b) => a.title.localeCompare(b.title));
    }

    return processed;
  };

  // 根据设置获取卡片高度
  const getCardHeight = () => {
    switch (settings.cardSize) {
      case "small":
        return 240;
      case "large":
        return 320;
      default:
        return 280;
    }
  };

  return {
    settings,
    processTasks,
    getCardHeight,
  };
};
