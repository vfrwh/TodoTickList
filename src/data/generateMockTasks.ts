import { type TaskItem } from "../types/taskItem";

const generateMockTasks = (): Record<string, TaskItem[]> => {
  const urgentImportantTasks: TaskItem[] = [
    {
      id: 1,
      title: "完成项目演示文稿",
      priority: "urgent",
      deadline: "今天 18:00",
      status: "pending",
      tags: ["工作", "紧急"],
    },
    {
      id: 2,
      title: "处理客户投诉",
      priority: "urgent",
      deadline: "今天 12:00",
      status: "pending",
      tags: ["客户", "紧急"],
    },
    {
      id: 3,
      title: "服务器故障修复",
      priority: "urgent",
      deadline: "今天 15:00",
      status: "pending",
      tags: ["技术", "紧急"],
    },
    {
      id: 4,
      title: "提交季度报告",
      priority: "high",
      deadline: "明天 10:00",
      status: "pending",
      tags: ["工作", "重要"],
    },
  ];

  const notUrgentImportantTasks: TaskItem[] = [
    {
      id: 5,
      title: "制定下季度计划",
      priority: "high",
      deadline: "本周五",
      status: "pending",
      tags: ["规划", "重要"],
    },
    {
      id: 6,
      title: "技能提升学习",
      priority: "medium",
      deadline: "每天",
      status: "pending",
      tags: ["学习", "成长"],
    },
    {
      id: 7,
      title: "团队建设活动",
      priority: "medium",
      deadline: "下周三",
      status: "pending",
      tags: ["团队", "文化"],
    },
    {
      id: 8,
      title: "年度目标回顾",
      priority: "high",
      deadline: "本月末",
      status: "pending",
      tags: ["目标", "复盘"],
    },
  ];

  const urgentNotImportantTasks: TaskItem[] = [
    {
      id: 9,
      title: "回复日常邮件",
      priority: "low",
      deadline: "今天",
      status: "pending",
      tags: ["沟通"],
    },
    {
      id: 10,
      title: "安排会议室",
      priority: "low",
      deadline: "今天 14:00",
      status: "pending",
      tags: ["行政"],
    },
    {
      id: 11,
      title: "打印会议资料",
      priority: "low",
      deadline: "今天 16:00",
      status: "pending",
      tags: ["准备"],
    },
    {
      id: 12,
      title: "电话回访",
      priority: "medium",
      deadline: "今天",
      status: "pending",
      tags: ["客户"],
    },
  ];

  const notUrgentNotImportantTasks: TaskItem[] = [
    {
      id: 13,
      title: "浏览行业新闻",
      priority: "low",
      deadline: "空闲时间",
      status: "pending",
      tags: ["资讯"],
    },
    {
      id: 14,
      title: "整理桌面文件",
      priority: "low",
      deadline: "本周",
      status: "pending",
      tags: ["整理"],
    },
    {
      id: 15,
      title: "查看社交媒体",
      priority: "low",
      deadline: "休息时间",
      status: "pending",
      tags: ["休闲"],
    },
    {
      id: 16,
      title: "更新简历",
      priority: "medium",
      deadline: "本月",
      status: "pending",
      tags: ["个人"],
    },
  ];

  return {
    title1: urgentImportantTasks,
    title2: notUrgentImportantTasks,
    title3: urgentNotImportantTasks,
    title4: notUrgentNotImportantTasks,
  };
};

export { generateMockTasks };
