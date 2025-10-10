import { Card,Button,Col, Row,Progress } from "antd"
import { useState } from 'react'
import './index.scss'
import type { ProgressProps } from 'antd';
import HabitDetails from "./components/HabitDetails";
import { useNavigate } from "react-router-dom";

const conicColors: ProgressProps['strokeColor'] = {
  '0%': '#87d068',
  '50%': '#ffe58f',
  '100%': '#ffccc7',
};


function Habit() {
  const [ title,setTitle ] = useState<string>('33')
  const [ count,setCount ] = useState<number>(0)
  const [ total,setTotal ] = useState<number>(1)
  const [day,setDay] = useState<number>(0)
  const [percent,setPercent] = useState<number>(0)

  const [open,setOpen] = useState<boolean>(false)
  const [isEdit,setIsEdit] = useState<boolean>(false)
  const navigate = useNavigate()
  const onEdit = (id:number) => {
    setIsEdit(true)
    setOpen(true)
    navigate(`/habit?id=${id}`)
  }

  const onAdd = () => {
    setIsEdit(false)
    setOpen(true)
  }

  const handleCloseDrawer = () => {
    setOpen(false);
    navigate('/habit', { replace: true });
  }


  return (
    <div className="container">
        <Card
          title= '习惯打卡' 
          extra={
            <Button type="primary" onClick={onAdd}>添加习惯</Button>
          } 
          style={{ 
            width: 1200, 
            height: '80%', 
            margin: '0 auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }} 
        >
          <Row>
            <Col span={12}>
              <Card>
                <div className='container1'>
                  <div className='header'>
                    <div className='point'></div>
                    <div className='content'>
                      <div className='title'>{title}</div>
                      <div className='sign'>滴滴滴</div>
                    </div>
                  </div>
                  <div className='count'><span className='value'>{count}</span>/{total}次</div>
                  <Progress percent={99.9} strokeColor={conicColors} showInfo={false}/>
                  <div className='calculation'>
                    <div className='continuous'>
                      <div className='content'>连续</div>
                      <div className='day'><span>{day}</span>天</div>
                    </div>
                    <div className='percentage'>
                      <div className='content'>完成率</div>
                      <div className='day'><span>{percent}</span>%</div>
                    </div>
                  </div>
                  <div className='button-group'>
                    <Button className='checkin-btn'>打卡</Button>
                    <Button className='edit-btn' onClick={() =>onEdit(item.id)}>编辑</Button>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>
        <HabitDetails 
          open={open} 
          isEdit={isEdit} 
          onClose={handleCloseDrawer}
        />
    </div>
  )
}

export default Habit
