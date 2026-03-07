import { type ListItem } from "@/types/ListItem";

const generateMockData = (count: number): ListItem[] => {
  const priorities: Array<"high" | "medium" | "low"> = [
    "high",
    "medium",
    "low",
  ];
  const statuses: Array<"pending" | "completed"> = ["pending", "completed"];
  const names = [
    "完成项目文档",
    "修复Bug",
    "代码审查",
    "团队会议",
    "需求分析",
    "原型设计",
    "用户测试",
    "性能优化",
    "部署上线",
    "编写测试用例",
    "数据库设计",
    "接口开发",
    "前端开发",
    "后端开发",
    "UI设计",
  ];
  const descriptions = [
    "需要在本周完成项目文档的编写和整理",
    "修复用户反馈的登录异常问题",
    "审查团队成员提交的代码",
    "讨论下周的工作计划和任务分配",
    "分析客户需求和业务流程",
    "设计产品原型和交互流程",
    "进行用户可用性测试",
    "优化页面加载速度和性能",
    "将新功能部署到生产环境",
    "编写单元测试和集成测试",
  ];
  const avatars = [
    "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
    "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
    "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
    "https://api.dicebear.com/7.x/miniavs/svg?seed=4",
    "https://api.dicebear.com/7.x/miniavs/svg?seed=5",
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: names[index % names.length] + (index + 1),
    avatar: avatars[index % avatars.length],
    description: descriptions[index % descriptions.length],
    priority: priorities[index % priorities.length],
    status: statuses[index % statuses.length],
    createTime: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
    ).toLocaleDateString(),
  }));
};

export default generateMockData;
