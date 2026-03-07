import { Card, Col, Row, Empty, List, Tag, Space } from "antd";
import {
  ClockCircleOutlined,
  FlagOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useQuadrants } from "@/hooks/useQuadrants";
import { QUADRANTS_CONFIG } from "@/data/quadrantsData";
import { useState, useEffect, useMemo } from "react";
import "./index.scss";
import { generateMockTasks } from "@/data/generateMockTasks";
import { type TaskItem } from "@/types/taskItem";
import { useQuadrantsSettings } from "@/hooks/useQuadrantsSettings";

// 获取优先级图标和颜色
const getPriorityConfig = (priority: string) => {
  switch (priority) {
    case "urgent":
      return {
        icon: <ExclamationCircleOutlined />,
        color: "#f5222d",
        text: "紧急",
      };
    case "high":
      return { icon: <FlagOutlined />, color: "#fa8c16", text: "高" };
    case "medium":
      return { icon: <ClockCircleOutlined />, color: "#1890ff", text: "中" };
    case "low":
      return { icon: <CheckCircleOutlined />, color: "#52c41a", text: "低" };
    default:
      return { icon: null, color: "#8c8c8c", text: "普通" };
  }
};

function Quadrants() {
  const [tasks, setTasks] = useState<Record<string, TaskItem[]>>({
    title1: [],
    title2: [],
    title3: [],
    title4: [],
  });

  const { settings, processTasks, getCardHeight } = useQuadrantsSettings();

  // 计算总任务数
  const totalTasks = useMemo(() => {
    return Object.values(tasks).flat().length;
  }, [tasks]);

  const {
    total,
    number1,
    number2,
    number3,
    number4,
    content1,
    content2,
    content3,
    content4,
  } = useQuadrants();

  // 初始化模拟数据
  useEffect(() => {
    const mockTasks = generateMockTasks();
    const processedTasks = {
      title1: processTasks(mockTasks.title1 || []),
      title2: processTasks(mockTasks.title2 || []),
      title3: processTasks(mockTasks.title3 || []),
      title4: processTasks(mockTasks.title4 || []),
    };
    setTasks(processedTasks);
  }, []);

  // 当排序方式改变时重新处理任务
  useEffect(() => {
    if (Object.values(tasks).some((arr) => arr.length > 0)) {
      const mockTasks = generateMockTasks();
      const processedTasks = {
        title1: processTasks(mockTasks.title1 || []),
        title2: processTasks(mockTasks.title2 || []),
        title3: processTasks(mockTasks.title3 || []),
        title4: processTasks(mockTasks.title4 || []),
      };
      setTasks(processedTasks);
    }
  }, [settings.defaultSortBy]);

  const quadrantsData = {
    title1: { number: number1, content: content1, tasks: tasks.title1 },
    title2: { number: number2, content: content2, tasks: tasks.title2 },
    title3: { number: number3, content: content3, tasks: tasks.title3 },
    title4: { number: number4, content: content4, tasks: tasks.title4 },
  };

  const quadrants = QUADRANTS_CONFIG.map((config) => ({
    ...config,
    number:
      quadrantsData[config.key as keyof typeof quadrantsData]?.number || 0,
    content:
      quadrantsData[config.key as keyof typeof quadrantsData]?.content || "",
    tasks: quadrantsData[config.key as keyof typeof quadrantsData]?.tasks || [],
  }));

  // 渲染任务列表
  const renderTaskList = (tasks: TaskItem[]) => {
    if (!tasks || tasks.length === 0) {
      return settings.showEmptyHint ? (
        <Empty description="暂无任务" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : null;
    }

    return (
      <List
        dataSource={tasks}
        split={false}
        renderItem={(task) => {
          const priority = getPriorityConfig(task.priority);
          return (
            <List.Item
              className="task-item"
              style={{
                padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <Space>
                    <span style={{ color: priority.color, fontSize: 14 }}>
                      {priority.icon}
                    </span>
                    <span style={{ color: "#fff", fontWeight: 500 }}>
                      {task.title}
                    </span>
                  </Space>
                  {settings.showDeadline && task.deadline && (
                    <Tag
                      color="rgba(255,255,255,0.2)"
                      style={{ color: "#fff" }}
                    >
                      {task.deadline}
                    </Tag>
                  )}
                </div>
                {settings.showTaskTags && task.tags && task.tags.length > 0 && (
                  <Space size={4} style={{ marginLeft: 22 }}>
                    {task.tags.map((tag) => (
                      <Tag
                        key={tag}
                        style={{
                          background: "rgba(255,255,255,0.15)",
                          border: "none",
                          color: "rgba(255,255,255,0.85)",
                          fontSize: 11,
                          padding: "0 6px",
                        }}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </Space>
                )}
              </div>
            </List.Item>
          );
        }}
      />
    );
  };

  return (
    <div className="quadrants-container">
      <Card
        title={
          <Space>
            <span style={{ fontSize: 20 }}>📊</span>
            <span>四象限矩阵</span>
          </Space>
        }
        extra={
          <div style={{ fontSize: "16px", fontWeight: 500 }}>
            总任务：
            <span style={{ color: "#1890ff" }}>
              {total || totalTasks || 16}
            </span>
          </div>
        }
        className="quadrants-card"
      >
        <Row gutter={[24, 24]}>
          {quadrants.map((quadrant, index) => {
            return (
              <Col xs={24} sm={24} md={12} key={index}>
                <Card
                  title={
                    <Space>
                      <span style={{ fontSize: 18 }}>{quadrant.icon}</span>
                      <span>{quadrant.title}</span>
                    </Space>
                  }
                  extra={
                    settings.showTaskCount ? (
                      <span
                        style={{
                          color: "rgba(255,255,255,0.9)",
                          fontWeight: 500,
                          fontSize: "14px",
                          background: "rgba(0,0,0,0.2)",
                          padding: "2px 8px",
                          borderRadius: "12px",
                        }}
                      >
                        {quadrant.tasks?.length || 0} 项
                      </span>
                    ) : null
                  }
                  className={`quadrant-card ${quadrant.className} ${
                    !settings.enableHoverEffect ? "no-hover" : ""
                  }`}
                  style={{
                    backgroundColor: quadrant.bgColor,
                    border: "none",
                  }}
                  styles={{
                    header: {
                      color: "white",
                      borderBottom: "1px solid rgba(255,255,255,0.2)",
                      fontSize: "16px",
                      fontWeight: 500,
                      padding: "16px 20px",
                    },
                    body: {
                      color: "white",
                      height: getCardHeight(),
                      overflow: "auto",
                      padding: "12px 20px",
                      scrollbarWidth: "thin",
                      scrollbarColor:
                        "rgba(255,255,255,0.3) rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  <div style={{ height: "100%" }}>
                    {renderTaskList(quadrant.tasks)}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>
    </div>
  );
}

export default Quadrants;
