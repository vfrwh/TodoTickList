import { Card,Button,Input,Avatar, List, Skeleton,Divider } from "antd"
import './index.scss'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useList } from '@/hooks/useList';

function ListComponent() {
  
const { data, loadMoreData } = useList();

  return (
    <div className="container">
      <Card title="任务清单" extra={<Button type="primary">添加任务</Button>} style={{width:1000,margin:'0 auto' }} >
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
              actions={[<Button color="primary" variant="solid" type="primary">编辑</Button>, <Button color="danger" variant="solid">删除</Button>]}
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
    </div>  
    
  )
}

export default ListComponent
