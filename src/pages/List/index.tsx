import {
  Card,
  Button,
  Input,
  Avatar,
  List,
  Skeleton,
  Divider,
  message,
  Popconfirm,
  Tag,
} from "antd";
import "./index.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import type { PopconfirmProps } from "antd";
import DrawerDetails from "./componets/drawerDetails";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import generateMockData from "@/data/generateMockData";
import { type ListItem } from "@/types/ListItem";

function ListComponent() {
  // 使用模拟数据
  const [data, setData] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [quickAddValue, setQuickAddValue] = useState("");

  // 初始化加载数据
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      // 模拟API请求延迟
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockData = generateMockData(20);
      setData(mockData);
      setHasMore(true);
    } catch (error) {
      message.error("加载失败");
      console.error("加载数据失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      // 模拟API请求延迟
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newData = generateMockData(10).map((item) => ({
        ...item,
        id: data.length + item.id,
      }));

      setData([...data, ...newData]);
      setPage(page + 1);

      // 模拟没有更多数据的情况
      if (data.length >= 50) {
        setHasMore(false);
      }
    } catch (error) {
      message.error("加载更多失败");
      console.error("加载更多数据失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdd = () => {
    if (!quickAddValue.trim()) {
      message.warning("请输入任务名称");
      return;
    }

    const newTask: ListItem = {
      id: data.length + 1,
      name: quickAddValue,
      description: "快速添加的任务",
      priority: "medium",
      status: "pending",
      createTime: new Date().toLocaleDateString(),
    };

    setData([newTask, ...data]);
    setQuickAddValue("");
    message.success("添加成功");
  };

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
    message.success("删除成功");
  };

  const handleConfirm =
    (id: number): PopconfirmProps["onConfirm"] =>
    () => {
      handleDelete(id);
    };

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

  // 获取优先级标签颜色
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  // 获取优先级文本
  const getPriorityText = (priority?: string) => {
    switch (priority) {
      case "high":
        return "高";
      case "medium":
        return "中";
      case "low":
        return "低";
      default:
        return "普通";
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
            dataLength={data.length}
            next={loadMoreData}
            hasMore={hasMore}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>没有更多任务了 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
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
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <a
                          href="#"
                          style={{ color: "#262626", fontWeight: 500 }}
                        >
                          {item.name}
                        </a>
                        {item.priority && (
                          <Tag color={getPriorityColor(item.priority)}>
                            {getPriorityText(item.priority)}
                          </Tag>
                        )}
                      </div>
                    }
                    description={
                      <div>
                        <div style={{ color: "#8c8c8c", marginBottom: 4 }}>
                          {item.description}
                        </div>
                        <div style={{ fontSize: 12, color: "#bfbfbf" }}>
                          创建时间：{item.createTime}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </Card>
      <DrawerDetails open={open} isEdit={isEdit} onClose={handleCloseDrawer} />
    </div>
  );
}

export default ListComponent;
