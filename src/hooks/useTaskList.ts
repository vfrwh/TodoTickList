import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import generateMockData from "@/data/generateMockData";
import { type ListItem } from "@/types/ListItem";

interface UseTaskListProps {
  defaultPriority: "high" | "medium" | "low";
  showCompleted: boolean;
  showDescription: boolean;
  showCreateTime: boolean;
  sortBy: string;
}

// 每页显示数量常量
const PAGE_SIZE = 10;

export const useTaskList = ({
  defaultPriority,
  showCompleted,
  showDescription,
  showCreateTime,
  sortBy,
}: UseTaskListProps) => {
  const [allData, setAllData] = useState<ListItem[]>([]);
  const [displayData, setDisplayData] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [quickAddValue, setQuickAddValue] = useState("");

  // 处理数据（排序、过滤）
  const processData = useCallback(
    (data: ListItem[]) => {
      let processed = [...data];

      // 过滤已完成任务
      if (!showCompleted) {
        processed = processed.filter((item) => item.status !== "completed");
      }

      // 排序 - 使用 if-else 而不是 switch 来避免 lexical declaration 错误
      if (sortBy === "createTimeDesc") {
        processed.sort((a, b) =>
          (b.createTime || "").localeCompare(a.createTime || ""),
        );
      } else if (sortBy === "createTimeAsc") {
        processed.sort((a, b) =>
          (a.createTime || "").localeCompare(b.createTime || ""),
        );
      } else if (sortBy === "priorityDesc") {
        const priorityWeight = { high: 3, medium: 2, low: 1 };
        processed.sort(
          (a, b) =>
            (priorityWeight[b.priority as keyof typeof priorityWeight] || 0) -
            (priorityWeight[a.priority as keyof typeof priorityWeight] || 0),
        );
      } else if (sortBy === "priorityAsc") {
        const priorityWeightAsc = { high: 3, medium: 2, low: 1 };
        processed.sort(
          (a, b) =>
            (priorityWeightAsc[a.priority as keyof typeof priorityWeightAsc] ||
              0) -
            (priorityWeightAsc[b.priority as keyof typeof priorityWeightAsc] ||
              0),
        );
      } else if (sortBy === "nameAsc") {
        processed.sort((a, b) => a.name.localeCompare(b.name));
      }

      return processed;
    },
    [showCompleted, sortBy],
  );

  // 加载初始数据
  const loadInitialData = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockData = generateMockData(50);
      const processed = processData(mockData);
      setAllData(processed);
      setDisplayData(processed.slice(0, PAGE_SIZE));
      setHasMore(processed.length > PAGE_SIZE);
    } catch (error) {
      message.error("加载失败");
      console.error("加载数据失败:", error);
    } finally {
      setLoading(false);
    }
  }, [processData]);

  // 加载更多数据
  const loadMoreData = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const nextPage = page + 1;
      const startIndex = page * PAGE_SIZE;
      const endIndex = nextPage * PAGE_SIZE;

      const newData = allData.slice(startIndex, endIndex);

      if (newData.length > 0) {
        setDisplayData((prev) => [...prev, ...newData]);
        setPage(nextPage);
        setHasMore(endIndex < allData.length);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      message.error("加载更多失败");
      console.error("加载更多数据失败:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, page, allData]);

  // 快速添加任务
  const handleQuickAdd = useCallback(() => {
    if (!quickAddValue.trim()) {
      message.warning("请输入任务名称");
      return false;
    }

    const newTask: ListItem = {
      id: Date.now(),
      name: quickAddValue,
      description: showDescription ? "快速添加的任务" : "",
      priority: defaultPriority,
      status: "pending",
      createTime: showCreateTime ? new Date().toLocaleDateString() : undefined,
    };

    const updatedAllData = [newTask, ...allData];
    const processed = processData(updatedAllData);
    setAllData(processed);
    setDisplayData(processed.slice(0, PAGE_SIZE));
    setQuickAddValue("");
    message.success("添加成功");
    return true;
  }, [
    quickAddValue,
    allData,
    defaultPriority,
    showDescription,
    showCreateTime,
    processData,
  ]);

  // 删除任务
  const handleDelete = useCallback(
    (id: number) => {
      const updatedAllData = allData.filter((item) => item.id !== id);
      const processed = processData(updatedAllData);
      setAllData(processed);
      setDisplayData(processed.slice(0, PAGE_SIZE));
      message.success("删除成功");
    },
    [allData, processData],
  );

  // 当设置变化时重新处理数据
  useEffect(() => {
    if (allData.length > 0) {
      const processed = processData(allData);
      setAllData(processed);
      setDisplayData(processed.slice(0, PAGE_SIZE));
      setPage(1);
      setHasMore(processed.length > PAGE_SIZE);
    }
  }, [showCompleted, sortBy]);

  // 初始化加载
  useEffect(() => {
    loadInitialData();
  }, []);

  return {
    displayData,
    loading,
    hasMore,
    quickAddValue,
    setQuickAddValue,
    loadMoreData,
    handleQuickAdd,
    handleDelete,
  };
};
