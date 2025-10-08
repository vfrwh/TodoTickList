import { Card,Button,Badge, Calendar } from "antd"
import type { BadgeProps, CalendarProps } from 'antd';
import { getListData,getMonthData } from "@/data/dateData";
import type { Dayjs } from 'dayjs';

function TimeLine() {

  const onSearchAll = () => {

  }

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div className="container">
        <Card
          title="时间线" 
          extra={
            <Button 
              type="primary" 
              onClick={onSearchAll}
            >
              全部
            </Button>
          } 
          style={{ 
            width: 1000, 
            // height: '80%', 
            margin: '0 auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Calendar cellRender={cellRender} />
        </Card>
    </div>
  )
}

export default TimeLine
