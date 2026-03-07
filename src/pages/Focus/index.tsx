import { Card, Button, Select } from "antd";
import "./index.scss";
import { useFocus } from "@/hooks/useFocus";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { PlayCircleOutlined, ReloadOutlined } from "@ant-design/icons";

function Focus() {
  const {
    timer,
    count,
    displayTime,
    isRunning,
    elapsedSeconds,
    progress,
    currentPhase,
    phaseTitle,
    handleStart,
    handleReset,
  } = useFocus();

  const focusSettingsValues = useSelector(
    (state: RootState) => state.focus.defaultValues,
  );
  const showProgressRing = focusSettingsValues.showProgressRing;

  const handleChange = (value: string) => {
    console.log("Selected task:", value);
  };

  // 根据阶段轻微调整颜色
  const phaseStyle = {
    focus: {
      primary: "#1890ff",
      bgLight: "#e6f7ff",
    },
    rest: {
      primary: "#52c41a",
      bgLight: "#f6ffed",
    },
  };

  const currentStyle = phaseStyle[currentPhase === "focus" ? "focus" : "rest"];

  return (
    <div className="container">
      <Card
        title={
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                background: currentStyle.primary,
                display: "inline-block",
              }}
            />
            {currentPhase === "focus" ? "专注模式" : "休息模式"}
          </span>
        }
        extra={
          <div style={{ display: "flex", gap: "16px" }}>
            <span>
              今日专注 {/* 使用类名 highlight-number */}
              <span
                className="highlight-number"
                style={{ color: currentStyle.primary }}
              >
                {timer}
              </span>{" "}
              分钟
            </span>
            <span>
              完成 {/* 使用类名 highlight-number */}
              <span
                className="highlight-number"
                style={{ color: currentStyle.primary }}
              >
                {count}
              </span>{" "}
              次
            </span>
          </div>
        }
        style={{
          width: 900,
          margin: "0 auto",
          marginTop: "2%",
        }}
      >
        <h4 className="title" style={{ color: currentStyle.primary }}>
          {phaseTitle}
        </h4>

        <div className="circles-container">
          <div
            className={`circle1 ${showProgressRing ? "with-progress" : ""}`}
            style={
              showProgressRing
                ? ({
                    "--progress": `${progress}%`,
                    borderColor: currentStyle.primary,
                  } as React.CSSProperties)
                : {}
            }
          >
            <div className="circle2">
              <div className="time-display">{displayTime}</div>
            </div>
          </div>
        </div>

        {showProgressRing && (
          <div className="progress-tip">
            当前进度 <span>{Math.round(progress)}%</span>
          </div>
        )}

        <div className="button-container">
          <Button
            className="start"
            onClick={handleStart}
            disabled={isRunning}
            icon={<PlayCircleOutlined />}
            style={{
              backgroundColor: isRunning ? undefined : currentStyle.primary,
            }}
          >
            {isRunning ? "计时中..." : "开始"}
          </Button>
          <Button
            className="reset"
            onClick={handleReset}
            disabled={!isRunning && elapsedSeconds === 0}
            icon={<ReloadOutlined />}
          >
            重置
          </Button>
        </div>

        <div className="task-section">
          <span className="task-label">选择专注任务</span>
          <Select
            placeholder="请选择或输入任务"
            onChange={handleChange}
            allowClear
            showSearch
            options={[
              { value: "coding", label: "💻 编程开发" },
              { value: "reading", label: "📚 阅读学习" },
              { value: "writing", label: "✍️ 写作" },
              { value: "design", label: "🎨 设计" },
              { value: "study", label: "📖 复习" },
              { value: "exercise", label: "🏃 运动" },
            ]}
          />
        </div>
      </Card>
    </div>
  );
}

export default Focus;
