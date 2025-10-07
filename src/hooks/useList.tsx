import  { useEffect, useState,useCallback } from 'react';
import type { DataType } from "@/types/ListDataType";
import { getListAPI } from '@/apis/list';


const useList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);

  // 加载更多数据
  const loadMoreData = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const res = await getListAPI(page);
      const results = Array.isArray(res) ? res : [];
      setData(prevData => [...prevData, ...results]);
      setPage(prevPage => prevPage + 1);
      
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, page]);


  // 重新加载数据
  const reloadData = useCallback(async () => {
  setLoading(true);
  try {
    const res = await getListAPI(1); 
    const results = Array.isArray(res) ? res : [];
    setData(results); 
    setPage(2); 
  } catch (error) {
    console.error('Failed to reload data:', error);
  } finally {
    setLoading(false);
  }
  }, []);


  // 初始加载
  useEffect(() => {
    loadMoreData();
    // reloadData();
  }, []);
  return { loading,data,page,loadMoreData,reloadData }
}

export { useList }