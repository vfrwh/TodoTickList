import { Card,Button } from "antd"
import { useState } from "react"
import './index.scss'

function Focus() {

  const [timer,setTimer] = useState<number>(0)
  const [count,setCount] = useState<number>(0)

  return (
    <div className="container">
        <Card
          title="专注" 
        extra={
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
            今日专注：<span style={{ color: '#1890ff' }}>{timer}</span>分钟&nbsp;
            完成次数: <span style={{ color: '#1890ff' }}>{count}</span>
          </div>
        } 
        style={{ 
          width: 1000, 
          height: '80%', 
          margin: '0 auto',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }} 
        >
          <h4 className="title">专注时间</h4>
          <div className="circles-container">
            <div className="circle1">
              <div className="circle2"></div>
            </div>
          </div>
        </Card>
    </div>
  )
}

export default Focus
