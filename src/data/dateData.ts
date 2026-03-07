// src/data/dateData.ts
import type { Dayjs } from "dayjs";

// 任务类型定义
export interface CalendarTask {
  type: "success" | "processing" | "warning" | "error" | "default";
  content: string;
}

// 生成随机任务
const generateRandomTasks = (date: Dayjs): CalendarTask[] => {
  const tasks: CalendarTask[] = [];
  const dayOfMonth = date.date();
  const month = date.month();

  // 根据日期决定任务数量
  const taskCount =
    Math.floor(Math.random() * 3) + (dayOfMonth % 3 === 0 ? 1 : 0);

  const taskTemplates = [
    { content: "完成项目文档", type: "success" as const },
    { content: "代码审查", type: "processing" as const },
    { content: "团队会议", type: "warning" as const },
    { content: "修复Bug", type: "error" as const },
    { content: "需求分析", type: "default" as const },
    { content: "原型设计", type: "processing" as const },
    { content: "用户测试", type: "success" as const },
    { content: "性能优化", type: "warning" as const },
    { content: "部署上线", type: "success" as const },
    { content: "写日报", type: "default" as const },
  ];

  for (let i = 0; i < taskCount; i++) {
    const randomIndex = (dayOfMonth + i + month) % taskTemplates.length;
    tasks.push(taskTemplates[randomIndex]);
  }

  return tasks;
};

// 获取某天的任务列表
export const getListData = (value: Dayjs) => {
  return generateRandomTasks(value);
};

// 获取某月的任务统计
export const getMonthData = (value: Dayjs) => {
  // 随机返回 1-5 的数字作为月任务数
  return Math.floor(Math.random() * 5) + 1;
};

// 获取任务统计信息
export const getTaskStats = () => {
  return {
    total: 24,
    completed: 8,
    processing: 6,
    warning: 7,
    error: 3,
  };
};
