import {
  Card,
  Button,
  Badge,
  Calendar,
  Tag,
  Space,
  Tooltip,
  Select,
} from "antd";
import type { BadgeProps, CalendarProps } from "antd";
import { getListData, getMonthData } from "@/data/dateData";
import type { Dayjs } from "dayjs";
import { CalendarOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./index.scss";

const { Option } = Select;

function TimeLine() {
  const [viewType, setViewType] = useState<"month" | "year">("month");

  const onViewChange = (type: "month" | "year") => {
    setViewType(type);
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
    const listData = getListData(value);
    return (
      <div className="date-cell">
        {listData.length > 0 ? (
          <div className="task-list">
            {listData.map((item, index) => (
              <Tooltip key={index} title={`${item.content} - ${item.type}`}>
                <div className={`task-item task-${item.type}`}>
                  <Badge
                    status={item.type as BadgeProps["status"]}
                    text={item.content}
                    className="task-badge"
                  />
                </div>
              </Tooltip>
            ))}
          </div>
        ) : (
          <div className="no-task">无任务</div>
        )}
      </div>
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
            <Button
              type="primary"
              onClick={() => onChange(value.clone().month(value.month()))}
            >
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

  return (
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
        />

        <div className="calendar-footer">
          <Space split="|" wrap>
            <span>
              总任务：<span className="footer-number">24</span>
            </span>
            <span>
              已完成：<span className="footer-number success">8</span>
            </span>
            <span>
              进行中：<span className="footer-number processing">6</span>
            </span>
            <span>
              待处理：<span className="footer-number warning">7</span>
            </span>
            <span>
              已逾期：<span className="footer-number error">3</span>
            </span>
          </Space>
        </div>
      </Card>
    </div>
  );
}

export default TimeLine;
