import {
  Card,
  Button,
  Badge,
  Calendar,
  Tag,
  Space,
  Tooltip,
  Select,
  message,
} from "antd";
import type { BadgeProps, CalendarProps } from "antd";
import { getListData, getMonthData, updateTaskDate } from "@/data/dateData";
import type { Dayjs } from "dayjs";
import { CalendarOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import "./index.scss";
import { useTimelineSettings } from "@/hooks/useTimelineSettings";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragItemTypes, type DragTaskItem } from "@/types/dragTypes";

// 扩展 dayjs 插件
dayjs.extend(isoWeek);

const { Option } = Select;

// 可拖拽的任务组件
const DraggableTask = ({
  task,
  date,
  children,
}: {
  task: any;
  date: Dayjs;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DragItemTypes.TASK,
      item: {
        id: task.id,
        date: date.format("YYYY-MM-DD"),
        content: task.content,
        type: task.type,
        priority: task.priority,
        tags: task.tags,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [task, date],
  );

  drag(ref);

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {children}
    </div>
  );
};

// 可放置的日期单元格组件
const DroppableDateCell = ({
  date,
  children,
  onTaskDrop,
}: {
  date: Dayjs;
  children: React.ReactNode;
  onTaskDrop: (task: DragTaskItem, targetDate: Dayjs) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DragItemTypes.TASK,
      drop: (item: DragTaskItem) => {
        onTaskDrop(item, date);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [date, onTaskDrop],
  );

  drop(ref);

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: isOver ? "rgba(24, 144, 255, 0.1)" : "transparent",
        transition: "background-color 0.2s",
        minHeight: "100%",
      }}
    >
      {children}
    </div>
  );
};

function TimeLine() {
  const { settings, filterTasks, getTaskColor } = useTimelineSettings();
  const [viewType, setViewType] = useState<"month" | "year">("month"); // 固定为月视图
  const [tasks, setTasks] = useState<any>({});

  // 初始化任务数据
  useEffect(() => {
    const initialTasks: any = {};
    for (let i = -15; i <= 15; i++) {
      const date = dayjs().add(i, "day");
      const dateStr = date.format("YYYY-MM-DD");
      initialTasks[dateStr] = getListData(date);
    }
    setTasks(initialTasks);
  }, []);

  // 调试用
  useEffect(() => {
    console.log("Current timeline settings:", settings);
  }, [settings]);

  const onViewChange = (type: "month" | "year") => {
    setViewType(type);
  };

  // 处理任务拖拽放置
  const handleTaskDrop = (task: DragTaskItem, targetDate: Dayjs) => {
    if (!settings.allowDrag) {
      message.info("拖拽功能已禁用，请在设置中开启");
      return;
    }

    const sourceDateStr = task.date;
    const targetDateStr = targetDate.format("YYYY-MM-DD");

    if (sourceDateStr === targetDateStr) {
      return;
    }

    setTasks((prevTasks: any) => {
      const newTasks = { ...prevTasks };

      if (newTasks[sourceDateStr]) {
        newTasks[sourceDateStr] = newTasks[sourceDateStr].filter(
          (t: any) => t.id !== task.id,
        );
      }

      if (!newTasks[targetDateStr]) {
        newTasks[targetDateStr] = [];
      }

      const newTask = {
        ...task,
        id: task.id,
      };

      newTasks[targetDateStr] = [...newTasks[targetDateStr], newTask];
      updateTaskDate(task.id, targetDateStr);
      message.success(`任务已移动到 ${targetDate.format("YYYY年MM月DD日")}`);

      return newTasks;
    });
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="month-cell">
        <div className="month-number">{num}</div>
        <div className="month-label">任务数</div>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const dateStr = value.format("YYYY-MM-DD");
    const listData = tasks[dateStr] || getListData(value);
    const filteredTasks = filterTasks(listData);

    const cellContent = (
      <div className="date-cell">
        {filteredTasks.length > 0 ? (
          <div className="task-list">
            {filteredTasks.map((item, index) => {
              const taskColor = getTaskColor(item);
              const taskElement = (
                <div
                  key={index}
                  className={`task-item`}
                  style={{ borderLeftColor: taskColor }}
                >
                  <Badge
                    status={
                      settings.taskColorScheme === "status"
                        ? (item.type as BadgeProps["status"])
                        : undefined
                    }
                    color={
                      settings.taskColorScheme === "priority"
                        ? taskColor
                        : undefined
                    }
                    text={item.content}
                    className="task-badge"
                  />
                  {settings.showTaskTags && item.tags && (
                    <Tag size="small" className="task-tag">
                      {item.tags[0]}
                    </Tag>
                  )}
                </div>
              );

              const wrappedTask = settings.allowDrag ? (
                <DraggableTask key={index} task={item} date={value}>
                  {taskElement}
                </DraggableTask>
              ) : (
                taskElement
              );

              return settings.enableTooltip ? (
                <Tooltip key={index} title={`${item.content} - ${item.type}`}>
                  {wrappedTask}
                </Tooltip>
              ) : (
                wrappedTask
              );
            })}
            {/* 显示更多任务提示 - 固定显示 */}
            {listData.length > settings.maxTasksPerDay &&
              settings.maxTasksPerDay !== 0 && (
                <div className="more-tasks">
                  +{listData.length - settings.maxTasksPerDay}个任务
                </div>
              )}
          </div>
        ) : (
          <div className="no-task">无任务</div>
        )}
      </div>
    );

    return settings.allowDrag ? (
      <DroppableDateCell date={value} onTaskDrop={handleTaskDrop}>
        {cellContent}
      </DroppableDateCell>
    ) : (
      cellContent
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const headerRender: CalendarProps<Dayjs>["headerRender"] = ({
    value,
    onChange,
  }) => {
    const currentYear = value.year();
    const currentMonth = value.month();

    // 生成年份选项
    const yearOptions = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      yearOptions.push(
        <Option key={i} value={i}>
          {i}年
        </Option>,
      );
    }

    // 生成月份选项
    const monthOptions = [];
    const months = [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ];
    for (let i = 0; i < 12; i++) {
      monthOptions.push(
        <Option key={i} value={i}>
          {months[i]}
        </Option>,
      );
    }

    return (
      <div className="calendar-header">
        <div className="header-left">
          <Space>
            <Button
              type={viewType === "month" ? "primary" : "default"}
              onClick={() => onViewChange("month")}
              icon={<CalendarOutlined />}
              className="view-btn"
            >
              月视图
            </Button>
            <Button
              type={viewType === "year" ? "primary" : "default"}
              onClick={() => onViewChange("year")}
              icon={<AppstoreOutlined />}
              className="view-btn"
            >
              年视图
            </Button>
          </Space>
        </div>

        <div className="header-center">
          <Space>
            <Button
              onClick={() => onChange(value.clone().subtract(1, "month"))}
            >
              上一月
            </Button>
            <Button onClick={() => onChange(value.clone().add(1, "month"))}>
              下一月
            </Button>
            <Button type="primary" onClick={() => onChange(dayjs())}>
              本月
            </Button>
          </Space>
        </div>

        <div className="header-right">
          <Space>
            <Select
              value={currentYear}
              onChange={(newYear) => {
                const now = value.clone().year(newYear);
                onChange(now);
              }}
              style={{ width: 100 }}
              size="middle"
            >
              {yearOptions}
            </Select>
            <Select
              value={currentMonth}
              onChange={(newMonth) => {
                const now = value.clone().month(newMonth);
                onChange(now);
              }}
              style={{ width: 80 }}
              size="middle"
            >
              {monthOptions}
            </Select>
          </Space>
        </div>
      </div>
    );
  };

  // 获取统计数据的函数
  const getTaskStats = () => {
    let total = 0;
    let completed = 0;
    let processing = 0;
    let warning = 0;
    let error = 0;

    Object.values(tasks).forEach((dayTasks: any) => {
      dayTasks.forEach((task: any) => {
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

  const stats = getTaskStats();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="timeline-container">
        <Card
          title={
            <Space>
              <span className="title-icon">📅</span>
              <span className="title-text">时间线</span>
              <Tag color="blue" className="title-tag">
                任务日历
              </Tag>
            </Space>
          }
          className="timeline-card"
        >
          {/* 图例 - 固定显示 */}
          <div className="calendar-legend">
            <Space size="large" wrap>
              <span>
                <Badge status="success" /> 已完成
              </span>
              <span>
                <Badge status="processing" /> 进行中
              </span>
              <span>
                <Badge status="warning" /> 待处理
              </span>
              <span>
                <Badge status="error" /> 已逾期
              </span>
              <span>
                <Badge status="default" /> 未开始
              </span>
            </Space>
          </div>

          <Calendar
            cellRender={cellRender}
            headerRender={headerRender}
            className="timeline-calendar"
            fullscreen={viewType === "month"}
            validRange={undefined}
          />

          {/* 底部统计 - 根据设置显示/隐藏 */}
          {settings.showFooterStats && (
            <div className="calendar-footer">
              <Space split="|" wrap>
                <span>
                  总任务：<span className="footer-number">{stats.total}</span>
                </span>
                <span>
                  已完成：
                  <span className="footer-number success">
                    {stats.completed}
                  </span>
                </span>
                <span>
                  进行中：
                  <span className="footer-number processing">
                    {stats.processing}
                  </span>
                </span>
                <span>
                  待处理：
                  <span className="footer-number warning">{stats.warning}</span>
                </span>
                <span>
                  已逾期：
                  <span className="footer-number error">{stats.error}</span>
                </span>
              </Space>
            </div>
          )}
        </Card>
      </div>
    </DndProvider>
  );
}

export default TimeLine;
