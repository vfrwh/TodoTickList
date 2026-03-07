import { useState, useEffect } from "react";
import { message } from "antd";

// 模拟数据，避免 API 调用
const mockData = {
  total: 16,
  number1: 4,
  number2: 4,
  number3: 4,
  number4: 4,
  content1: "紧急重要",
  content2: "重要不紧急",
  content3: "紧急不重要",
  content4: "不重要不紧急",
};

export const useQuadrants = () => {
  const [total, setTotal] = useState(0);
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);
  const [number4, setNumber4] = useState(0);
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  const [content3, setContent3] = useState("");
  const [content4, setContent4] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 使用模拟数据，避免实际 API 调用
      await new Promise((resolve) => setTimeout(resolve, 500)); // 模拟延迟

      setTotal(mockData.total);
      setNumber1(mockData.number1);
      setNumber2(mockData.number2);
      setNumber3(mockData.number3);
      setNumber4(mockData.number4);
      setContent1(mockData.content1);
      setContent2(mockData.content2);
      setContent3(mockData.content3);
      setContent4(mockData.content4);
    } catch (error) {
      console.error("Failed to load data:", error);
      message.error("加载数据失败");
    } finally {
      setLoading(false);
    }
  };

  return {
    total,
    number1,
    number2,
    number3,
    number4,
    content1,
    content2,
    content3,
    content4,
    loading,
  };
};
