import { Card, Button, Space, Select, Form } from "antd"
import './index.scss'
import { useFocus } from '@/hooks/useFocus'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'

function Focus() {
  const {
    timer,
    count,
    displayTime,
    isRunning,
    elapsedSeconds,
    progress,
    handleStart,
    handleReset,
  } = useFocus()

  // 获取是否显示进度环的设置
  const focusSettingsValues = useSelector((state: RootState) => state.focus.defaultValues)
  const showProgressRing = focusSettingsValues.showProgressRing

  const handleChange = (value: string) => {
    // 处理选择变化
  }

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
          marginTop: '2%',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }} 
      >
        <h4 className="title">专注时间</h4>
        <div className="circles-container">
          <div 
            className={`circle1 ${showProgressRing ? 'with-progress' : ''}`}
            style={showProgressRing ? { '--progress': `${progress}%` } as React.CSSProperties : {}}
          >
            <div className="circle2">
              <div className="time-display">{displayTime}</div>
            </div>
          </div>
        </div>
        <div className="button-container">
          <Button 
            size="large" 
            type="primary" 
            className="start"
            onClick={handleStart}
            disabled={isRunning}
          >
            {isRunning ? '计时中...' : '开始'}
          </Button>
          <Button 
            size="large" 
            className="reset"
            onClick={handleReset}
            disabled={!isRunning && elapsedSeconds === 0}
          >
            重置
          </Button>
        </div>
        <Space wrap>
          <Form>
            <Form.Item
              label="选择专注任务"
              name="task"
            >
              <Select
                placeholder="请选择专注任务"
                style={{ width: 150 }}
                onChange={handleChange}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  )
}

export default Focus