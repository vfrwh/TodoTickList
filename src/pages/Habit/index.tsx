import { Card, Button, Col, Row, Progress, Tag, Empty } from "antd";
import { useState, useEffect } from "react";
import {
  CheckOutlined,
  EditOutlined,
  PlusOutlined,
  FireOutlined,
} from "@ant-design/icons";
import "./index.scss";
import type { ProgressProps } from "antd";
import HabitDetails from "./components/HabitDetails";
import type { HabitFormTypes } from "@/types/HabitFormType";
import { useNavigate } from "react-router-dom";
import {
  generateMockHabits,
  getHabitStats,
  type HabitItem,
  categoryColors,
} from "@/data/habitData";
import { useHabitSettings } from "@/hooks/useHabitSettings";

const conicColors: ProgressProps["strokeColor"] = {
  "0%": "#87d068",
  "50%": "#ffe58f",
  "100%": "#ffccc7",
};

function Habit() {
  const [habits, setHabits] = useState<HabitItem[]>([]);
  const [stats, setStats] = useState({
    totalHabits: 0,
    completedHabits: 0,
    totalCheckins: 0,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentHabit, setCurrentHabit] = useState<HabitItem | null>(null);

  const navigate = useNavigate();
  const { settings, getColSpan, isGridLayout } = useHabitSettings();

  // 调试用
  useEffect(() => {
    console.log("Current habit settings:", settings);
  }, [settings]);

  // 初始化模拟数据
  useEffect(() => {
    const mockHabits = generateMockHabits();
    setHabits(mockHabits);
    setStats(getHabitStats(mockHabits));
  }, []);

  // 更新统计信息
  useEffect(() => {
    setStats(getHabitStats(habits));
  }, [habits]);

  const onEdit = (habit: HabitItem) => {
    setCurrentHabit(habit);
    setIsEdit(true);
    setOpen(true);
    navigate(`/habit?id=${habit.id}`);
  };

  const onAdd = () => {
    setCurrentHabit(null);
    setIsEdit(false);
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
    setCurrentHabit(null);
    navigate("/habit", { replace: true });
  };

  const handleCheckin = (habit: HabitItem) => {
    if (habit.count < habit.total) {
      const updatedHabits = habits.map((h) => {
        if (h.id === habit.id) {
          const newCount = h.count + 1;
          return {
            ...h,
            count: newCount,
            day: settings.autoIncrementStreak ? newCount : h.day,
            percent: Math.round((newCount / h.total) * 100),
            completed: newCount === h.total,
          };
        }
        return h;
      });
      setHabits(updatedHabits);
    }
  };

  const handleSaveHabit = (habitData: HabitFormTypes) => {
    if (isEdit && currentHabit) {
      // 编辑现有习惯
      const updatedHabits = habits.map((h) =>
        h.id === currentHabit.id
          ? {
              ...h,
              title: habitData.taskName,
              sign: habitData.sign,
              total: habitData.count,
              category: habitData.category as HabitItem["category"],
              color:
                categoryColors[
                  habitData.category as keyof typeof categoryColors
                ] || "#1890ff",
            }
          : h,
      );
      setHabits(updatedHabits);
    } else {
      // 添加新习惯 - 使用设置中的默认分类
      const newHabit: HabitItem = {
        id: habits.length + 1,
        title: habitData.taskName,
        sign: habitData.sign,
        count: 0,
        total: habitData.count,
        day: 0,
        percent: 0,
        color:
          categoryColors[habitData.category as keyof typeof categoryColors] ||
          "#1890ff",
        category: habitData.category as HabitItem["category"],
        completed: false,
      };
      setHabits([...habits, newHabit]);
    }
  };

  return (
    <div className="habit-container">
      <Card
        title={
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: 20 }}>✅</span>
            <span>习惯打卡</span>
          </span>
        }
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onAdd}
            className="add-habit-btn"
          >
            添加习惯
          </Button>
        }
        className="habit-card"
      >
        {/* 统计卡片 - 根据设置显示/隐藏 */}
        {settings.showStatsCard && (
          <div className="habit-stats">
            <div className="stat-item">
              <div className="stat-value">{stats.totalHabits}</div>
              <div className="stat-label">总习惯</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.completedHabits}</div>
              <div className="stat-label">已完成</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.totalCheckins}</div>
              <div className="stat-label">总打卡</div>
            </div>
          </div>
        )}

        {/* 习惯列表 - 根据布局方式渲染 */}
        {isGridLayout ? (
          <Row gutter={[24, 24]}>
            {habits.length > 0 ? (
              habits.map((habit) => (
                <Col xs={24} sm={24} md={getColSpan()} key={habit.id}>
                  <Card
                    className={`habit-item-card ${habit.completed ? "completed" : ""}`}
                  >
                    <div className="habit-item">
                      <div className="habit-header">
                        <div className="habit-title-wrapper">
                          <div
                            className="habit-point"
                            style={{ backgroundColor: habit.color }}
                          />
                          <div className="habit-info">
                            <div className="habit-title">{habit.title}</div>
                            <Tag color={habit.color} className="habit-category">
                              {habit.category}
                            </Tag>
                          </div>
                        </div>
                        {habit.completed && (
                          <Tag color="success" className="completed-tag">
                            已完成
                          </Tag>
                        )}
                      </div>

                      <div className="habit-sign">{habit.sign}</div>

                      <div className="habit-count">
                        <span className="habit-count-value">{habit.count}</span>
                        <span className="habit-count-total">
                          /{habit.total}次
                        </span>
                      </div>

                      {settings.showProgressBar && (
                        <Progress
                          percent={habit.percent}
                          strokeColor={conicColors}
                          showInfo={false}
                          className="habit-progress"
                        />
                      )}

                      <div className="habit-calculation">
                        {settings.showStreak && (
                          <div className="calculation-item">
                            <FireOutlined style={{ color: "#faad14" }} />
                            <span className="calculation-content">连续</span>
                            <span className="calculation-value">
                              {habit.day}天
                            </span>
                          </div>
                        )}
                        {settings.showCompletionRate && (
                          <div className="calculation-item">
                            <span className="calculation-content">完成率</span>
                            <span className="calculation-value">
                              {habit.percent}%
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="habit-actions">
                        <Button
                          className="checkin-btn"
                          icon={<CheckOutlined />}
                          onClick={() => handleCheckin(habit)}
                          disabled={habit.completed}
                        >
                          {habit.completed ? "已完成" : "打卡"}
                        </Button>
                        <Button
                          className="edit-btn"
                          icon={<EditOutlined />}
                          onClick={() => onEdit(habit)}
                        >
                          编辑
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Empty description="暂无习惯，点击添加按钮创建" />
              </Col>
            )}
          </Row>
        ) : (
          // 列表布局
          <div className="list-layout">
            {habits.length > 0 ? (
              habits.map((habit) => (
                <Card
                  key={habit.id}
                  className={`habit-item-card ${habit.completed ? "completed" : ""}`}
                  style={{ marginBottom: 16 }}
                >
                  <div className="habit-item">
                    <div className="habit-header">
                      <div className="habit-title-wrapper">
                        <div
                          className="habit-point"
                          style={{ backgroundColor: habit.color }}
                        />
                        <div className="habit-info">
                          <div className="habit-title">{habit.title}</div>
                          <Tag color={habit.color} className="habit-category">
                            {habit.category}
                          </Tag>
                        </div>
                      </div>
                      {habit.completed && (
                        <Tag color="success" className="completed-tag">
                          已完成
                        </Tag>
                      )}
                    </div>

                    <div className="habit-sign">{habit.sign}</div>

                    <div className="habit-count">
                      <span className="habit-count-value">{habit.count}</span>
                      <span className="habit-count-total">
                        /{habit.total}次
                      </span>
                    </div>

                    {settings.showProgressBar && (
                      <Progress
                        percent={habit.percent}
                        strokeColor={conicColors}
                        showInfo={false}
                        className="habit-progress"
                      />
                    )}

                    <div className="habit-calculation">
                      {settings.showStreak && (
                        <div className="calculation-item">
                          <FireOutlined style={{ color: "#faad14" }} />
                          <span className="calculation-content">连续</span>
                          <span className="calculation-value">
                            {habit.day}天
                          </span>
                        </div>
                      )}
                      {settings.showCompletionRate && (
                        <div className="calculation-item">
                          <span className="calculation-content">完成率</span>
                          <span className="calculation-value">
                            {habit.percent}%
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="habit-actions">
                      <Button
                        className="checkin-btn"
                        icon={<CheckOutlined />}
                        onClick={() => handleCheckin(habit)}
                        disabled={habit.completed}
                      >
                        {habit.completed ? "已完成" : "打卡"}
                      </Button>
                      <Button
                        className="edit-btn"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(habit)}
                      >
                        编辑
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Empty description="暂无习惯，点击添加按钮创建" />
            )}
          </div>
        )}
      </Card>

      <HabitDetails
        open={open}
        isEdit={isEdit}
        onClose={handleCloseDrawer}
        habitData={currentHabit}
        onSave={handleSaveHabit}
        defaultCategory={settings.defaultCategory} // 传递默认分类
        defaultTargetCount={settings.defaultTargetCount} // 传递默认目标次数
      />
    </div>
  );
}

export default Habit;
