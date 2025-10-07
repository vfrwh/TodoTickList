import { Card,Button,Input,Avatar, List, Skeleton,Divider,message, Popconfirm } from "antd"
import './index.scss'
import InfiniteScroll from 'react-infinite-scroll-component';
import type { PopconfirmProps } from 'antd';
import { useList } from '@/hooks/useList';
import { deletListAPI } from "@/apis/list";
import DrawerDetails from "./componets/drawerDetails";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ListComponent() {
  
const { data, loadMoreData,reloadData } = useList();
const handleConfirm = (id:number) : PopconfirmProps['onConfirm'] => async () => {
  try {
    await deletListAPI({id})
    reloadData();
    message.success('删除成功');
  } catch (error) {
    console.error('删除失败:', error)
    message.error('删除失败');
  }
  
};
// 是否开启抽屉
const [open,setOpen] = useState<boolean>(false)
const [isEdit,setIsEdit] = useState<boolean>(false)
const navigate = useNavigate()
const onEdit = (id:number) => {
  setIsEdit(true)
  setOpen(true)
  navigate(`/list?id=${id}`)
}

const onAdd = () => {
  setIsEdit(false)
  setOpen(true)
}

const handleCloseDrawer = () => {
  setOpen(false);
  navigate('/list', { replace: true });
}

  return (
    <div className="container">
      <Card title="任务清单" extra={<Button type="primary" onClick={onAdd}>添加任务</Button>} style={{width:1000,margin:'0 auto' }} >
        <Input placeholder="快速添加任务" style={{marginBottom:20}}/>
        <div
      id="scrollableDiv"
      style={{
        height: 650,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>没有更多了 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              actions={
                [
                  <Button color="primary" variant="solid" onClick={() =>onEdit(item.id)}>编辑</Button>,
                  <Popconfirm
                    title="删除数据"
                    description="确定要删除数据吗?"
                    onConfirm={handleConfirm(item.id)}
                    okText="确认"
                    cancelText="取消"
                  >
                    <Button color="danger" variant="solid">删除</Button>
                  </Popconfirm>
                ]
              }
            >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
            </List.Item>
          )}
        />
      </InfiniteScroll>
        </div>
      </Card>
      <DrawerDetails 
        open={open} 
        isEdit={isEdit} 
        onClose={handleCloseDrawer}
      />
    </div>  
    
  )
}

export default ListComponent
