import { Card,Col, Row,Empty } from "antd"
import { useQuadrants } from "@/hooks/useQuadrants"
import { QUADRANTS_CONFIG } from "@/data/quadrantsData"

function Quadrants() {
  const { 
    total, 
    number1, 
    number2, 
    number3, 
    number4,
    content1, 
    content2, 
    content3, 
    content4,
  } = useQuadrants()
  
  const quadrantsData = {
    title1: { number: number1, content: content1 },
    title2: { number: number2, content: content2 },
    title3: { number: number3, content: content3 },
    title4: { number: number4, content: content4 },
  }

  const quadrants = QUADRANTS_CONFIG.map(config => ({
    ...config,
    number: quadrantsData[config.key].number,
    content: quadrantsData[config.key].content
  }))

  return (
    <div className="container">
      <Card 
        title="四象限矩阵" 
        extra={
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
            总任务：<span style={{ color: '#1890ff' }}>{total}</span>
          </div>
        } 
        style={{ 
          width: 1000, 
          height: '80%', 
          margin: '0 auto',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Row justify="space-evenly" gutter={[30, 30]}>
          {quadrants.map((quadrant, index) => (
            <Col span={12} key={index}>
              <Card 
                title={quadrant.title}
                extra={
                  <span style={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}>
                    ({quadrant.number})
                  </span>
                }
                style={{
                  height: 350,
                  backgroundColor: quadrant.bgColor,
                  border: 'none',
                  borderRadius: '8px'
                }}
                styles={{
                  header: { 
                    color: 'white',
                    borderBottom: '1px solid rgba(255,255,255,0.2)',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  },
                  body: { 
                    color: 'white',
                    height: 'calc(100% - 57px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }
                }}
              >
                <div style={{ 
                  width: '100%', 
                 
                }}>
                  {quadrant.content || <Empty />}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>

  )
}

export default Quadrants
