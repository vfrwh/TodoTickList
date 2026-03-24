import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

// 任务类型定义
export interface CalendarTask {
  id?: string | number;
  type: "success" | "processing" | "warning" | "error" | "default";
  content: string;
  priority?: "high" | "medium" | "low";
  tags?: string[];
}

// 存储任务数据的对象
const taskStore: Record<string, CalendarTask[]> = {};

// 生成随机任务
const generateRandomTasks = (date: Dayjs): CalendarTask[] => {
  const tasks: CalendarTask[] = [];
  const dayOfMonth = date.date();
  const month = date.month();

  // 根据日期决定任务数量
  const taskCount =
    Math.floor(Math.random() * 3) + (dayOfMonth % 3 === 0 ? 1 : 0);

  const taskTemplates = [
    {
      content: "完成项目文档",
      type: "success" as const,
      priority: "high" as const,
    },
    {
      content: "代码审查",
      type: "processing" as const,
      priority: "medium" as const,
    },
    {
      content: "团队会议",
      type: "warning" as const,
      priority: "high" as const,
    },
    { content: "修复Bug", type: "error" as const, priority: "high" as const },
    {
      content: "需求分析",
      type: "default" as const,
      priority: "medium" as const,
    },
    {
      content: "原型设计",
      type: "processing" as const,
      priority: "medium" as const,
    },
    { content: "用户测试", type: "success" as const, priority: "low" as const },
    {
      content: "性能优化",
      type: "warning" as const,
      priority: "medium" as const,
    },
    {
      content: "部署上线",
      type: "success" as const,
      priority: "high" as const,
    },
    { content: "写日报", type: "default" as const, priority: "low" as const },
  ];

  for (let i = 0; i < taskCount; i++) {
    const randomIndex = (dayOfMonth + i + month) % taskTemplates.length;
    const template = taskTemplates[randomIndex];
    tasks.push({
      ...template,
      id: `${date.format("YYYYMMDD")}-${i}-${Date.now()}`,
      tags: [template.type],
    });
  }

  return tasks;
};

// 获取某天的任务列表
export const getListData = (value: Dayjs): CalendarTask[] => {
  const dateStr = value.format("YYYY-MM-DD");

  // 如果已经有缓存的任务，直接返回
  if (taskStore[dateStr]) {
    return taskStore[dateStr];
  }

  // 否则生成新的任务
  const tasks = generateRandomTasks(value);
  taskStore[dateStr] = tasks;
  return tasks;
};

// 获取某月的任务统计
export const getMonthData = () => {
  // 随机返回 1-5 的数字作为月任务数
  return Math.floor(Math.random() * 5) + 1;
};

// 获取所有任务
export const getAllTasks = () => {
  const tasks: Array<{ date: string; tasks: CalendarTask[] }> = [];
  const today = dayjs();

  // 获取最近30天的任务
  for (let i = -15; i <= 15; i++) {
    const date = today.add(i, "day");
    const dateStr = date.format("YYYY-MM-DD");
    const dateTasks = taskStore[dateStr] || getListData(date);

    if (dateTasks.length > 0) {
      tasks.push({
        date: date.format("YYYY年MM月DD日"),
        tasks: dateTasks,
      });
    }
  }

  return tasks;
};

// 更新任务日期
export const updateTaskDate = (taskId: string | number, newDate: string) => {
  // 查找任务
  let taskToMove: CalendarTask | null = null;
  let oldDate: string | null = null;

  // 遍历所有日期找到任务
  Object.entries(taskStore).forEach(([date, tasks]) => {
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
      taskToMove = tasks[taskIndex];
      oldDate = date;
      // 从原日期移除
      taskStore[date] = tasks.filter((t) => t.id !== taskId);
    }
  });

  // 如果找到任务，添加到新日期
  if (taskToMove && oldDate && oldDate !== newDate) {
    if (!taskStore[newDate]) {
      taskStore[newDate] = [];
    }
    taskStore[newDate].push(taskToMove);
  }

  return taskToMove;
};

// 获取任务统计信息
export const getTaskStats = () => {
  let total = 0;
  let completed = 0;
  let processing = 0;
  let warning = 0;
  let error = 0;

  Object.values(taskStore).forEach((tasks) => {
    tasks.forEach((task) => {
      total++;
      switch (task.type) {
        case "success":
          completed++;
          break;
        case "processing":
          processing++;
          break;
        case "warning":
          warning++;
          break;
        case "error":
          error++;
          break;
      }
    });
  });

  return {
    total: total || 24,
    completed: completed || 8,
    processing: processing || 6,
    warning: warning || 7,
    error: error || 3,
  };
};
