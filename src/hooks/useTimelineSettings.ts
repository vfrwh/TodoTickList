import { useSelector } from "react-redux";
import { useCallback } from "react";
import type { RootState } from "@/store";
import { defaultValues } from "@/data/timelineSettingsData";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { type CalendarTask } from "@/data/dateData";

// 扩展 dayjs 插件
dayjs.extend(isoWeek);

export const useTimelineSettings = () => {
  const settings = useSelector((state: RootState) => {
    console.log("Timeline settings from Redux:", state.timeline?.defaultValues);
    return state.timeline?.defaultValues || defaultValues;
  });

  // 根据设置过滤任务
  const filterTasks = useCallback((tasks: CalendarTask[]) => {
    if (settings.maxTasksPerDay === 0) return tasks;
    return tasks.slice(0, settings.maxTasksPerDay);
  }, [settings.maxTasksPerDay]);

  // 根据设置获取任务颜色
  const getTaskColor = useCallback((task: CalendarTask) => {
    if (settings.taskColorScheme === "status") {
      switch (task.type) {
        case "success":
          return "#52c41a";
        case "processing":
          return "#1890ff";
        case "warning":
          return "#faad14";
        case "error":
          return "#f5222d";
        default:
          return "#d9d9d9";
      }
    } else {
      // 按优先级
      switch (task.priority) {
        case "high":
          return "#f5222d";
        case "medium":
          return "#faad14";
        case "low":
          return "#52c41a";
        default:
          return "#1890ff";
      }
    }
  }, [settings.taskColorScheme]);

  return {
    settings,
    filterTasks,
    getTaskColor,
  };
};
