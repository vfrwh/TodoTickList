import {
  Card,
  Button,
  Input,
  Avatar,
  List,
  Skeleton,
  Divider,
  Popconfirm,
  Tag,
} from "antd";
import "./index.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import type { PopconfirmProps } from "antd";
import DrawerDetails from "./componets/drawerDetails";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useTaskList } from "@/hooks/useTaskList";
import { useTaskPriority } from "@/hooks/useTaskPriority";

// 创建优先级组件避免在回调中使用 Hook
const PriorityTag = ({ priority }: { priority?: string }) => {
  const { color, text } = useTaskPriority(priority as any);
  return <Tag color={color}>{text}</Tag>;
};

function ListComponent() {
  // 获取设置
  const listSettings = useSelector(
    (state: RootState) => state.list.defaultValues,
  );

  // 本地视图模式状态，用于立即响应切换
  const [currentViewMode, setCurrentViewMode] = useState(listSettings.viewMode);

  // 当设置中的视图模式变化时更新本地状态
  useEffect(() => {
    setCurrentViewMode(listSettings.viewMode);
  }, [listSettings.viewMode]);

  // 使用自定义 hooks
  const {
    displayData,
    hasMore,
    quickAddValue,
    setQuickAddValue,
    loadMoreData,
    handleQuickAdd,
    handleDelete,
  } = useTaskList({
    defaultPriority: listSettings.defaultPriority,
    showCompleted: listSettings.showCompleted,
    showDescription: listSettings.showDescription,
    showCreateTime: listSettings.showCreateTime,
    sortBy: listSettings.sortBy,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const navigate = useNavigate();

  const onEdit = (id: number) => {
    setIsEdit(true);
    setOpen(true);
    navigate(`/list?id=${id}`);
  };

  const onAdd = () => {
    setIsEdit(false);
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
    navigate("/list", { replace: true });
  };

  const handleConfirm =
    (id: number): PopconfirmProps["onConfirm"] =>
    () => {
      handleDelete(id);
    };

  // 根据视图模式渲染不同的列表项
  const renderListItem = (item: any) => {
    switch (currentViewMode) {
      case "card":
        return (
          <div className="task-card">
            <div className="task-card-header">
              <Avatar src={item.avatar} className="task-avatar" />
              <div className="task-title-wrapper">
                <span className="task-title">{item.name}</span>
                {item.priority && <PriorityTag priority={item.priority} />}
              </div>
            </div>
            {listSettings.showDescription && item.description && (
              <div className="task-description">{item.description}</div>
            )}
            {listSettings.showCreateTime && item.createTime && (
              <div className="task-time">创建时间：{item.createTime}</div>
            )}
            <div className="task-actions">
              <Button
                color="primary"
                variant="solid"
                onClick={() => onEdit(item.id)}
                size="small"
              >
                编辑
              </Button>
              <Popconfirm
                title="删除任务"
                description="确定要删除这个任务吗？"
                onConfirm={handleConfirm(item.id)}
                okText="确认"
                cancelText="取消"
              >
                <Button color="danger" variant="solid" size="small">
                  删除
                </Button>
              </Popconfirm>
            </div>
          </div>
        );

      case "compact":
        return (
          <div className="task-compact">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Avatar src={item.avatar} size="small" />
              <span className="compact-title">{item.name}</span>
              {item.priority && <PriorityTag priority={item.priority} />}
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button type="link" size="small" onClick={() => onEdit(item.id)}>
                编辑
              </Button>
              <Popconfirm
                title="删除任务"
                description="确定要删除这个任务吗？"
                onConfirm={handleConfirm(item.id)}
                okText="确认"
                cancelText="取消"
              >
                <Button type="link" danger size="small">
                  删除
                </Button>
              </Popconfirm>
            </div>
          </div>
        );

      default: // list 视图
        return (
          <List.Item
            actions={[
              <Button
                color="primary"
                variant="solid"
                onClick={() => onEdit(item.id)}
                size="small"
              >
                编辑
              </Button>,
              <Popconfirm
                title="删除任务"
                description="确定要删除这个任务吗？"
                onConfirm={handleConfirm(item.id)}
                okText="确认"
                cancelText="取消"
              >
                <Button color="danger" variant="solid" size="small">
                  删除
                </Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span style={{ color: "#262626", fontWeight: 500 }}>
                    {item.name}
                  </span>
                  {item.priority && <PriorityTag priority={item.priority} />}
                </div>
              }
              description={
                <div>
                  {listSettings.showDescription && (
                    <div style={{ color: "#8c8c8c", marginBottom: 4 }}>
                      {item.description}
                    </div>
                  )}
                  {listSettings.showCreateTime && item.createTime && (
                    <div style={{ fontSize: 12, color: "#bfbfbf" }}>
                      创建时间：{item.createTime}
                    </div>
                  )}
                </div>
              }
            />
          </List.Item>
        );
    }
  };

  return (
    <div className="container">
      <Card
        title={
          <span>
            <span style={{ marginRight: 8 }}>📋</span>
            任务清单
          </span>
        }
        extra={
          <Button type="primary" onClick={onAdd}>
            + 新建任务
          </Button>
        }
        style={{
          width: 1000,
          margin: "0 auto",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", gap: "12px", marginBottom: 20 }}>
          <Input
            placeholder="快速添加任务，回车保存"
            value={quickAddValue}
            onChange={(e) => setQuickAddValue(e.target.value)}
            onPressEnter={handleQuickAdd}
            style={{ flex: 1 }}
          />
          <Button color="primary" variant="solid" onClick={handleQuickAdd}>
            添加
          </Button>
        </div>

        <div
          id="scrollableDiv"
          style={{
            height: 550,
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid #f0f0f0",
            borderRadius: 8,
          }}
        >
          <InfiniteScroll
            dataLength={displayData.length}
            next={loadMoreData}
            hasMore={hasMore}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>没有更多任务了 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            {currentViewMode === "list" ? (
              <List
                itemLayout="horizontal"
                dataSource={displayData}
                renderItem={(item) => renderListItem(item)}
              />
            ) : (
              <div className={`grid-view grid-${currentViewMode}`}>
                {displayData.map((item) => (
                  <div key={item.id} className="grid-item">
                    {renderListItem(item)}
                  </div>
                ))}
              </div>
            )}
          </InfiniteScroll>
        </div>
      </Card>
      <DrawerDetails open={open} isEdit={isEdit} onClose={handleCloseDrawer} />
    </div>
  );
}

export default ListComponent;
