import { Button, Checkbox, Form, Input, Card, Row, Col } from 'antd';
import type { FormProps } from 'antd';
import type { FieldType } from '../../types/loginFormType';


function LoginComponent() {

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '420px',
          borderRadius: '12px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '20px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: 600, 
            color: '#1890ff',
            margin: 0 
          }}>
            用户登录
          </h2>
          <p style={{ 
            color: '#666', 
            marginTop: '8px',
            fontSize: '14px'
          }}>
            欢迎回来，请登录您的账户
          </p>
        </div>

        <Form
          name="basic"
          layout="vertical"
          style={{ width: '100%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label={<span style={{ fontWeight: 500 }}>用户名</span>}
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
            style={{ marginBottom: '20px' }}
          >
            <Input 
              size="large" 
              placeholder="请输入用户名"
              style={{ 
                borderRadius: '8px',
                padding: '10px 12px'
              }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label={<span style={{ fontWeight: 500 }}>密码</span>}
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
            style={{ marginBottom: '24px' }}
          >
            <Input.Password 
              size="large" 
              placeholder="请输入密码"
              style={{ 
                borderRadius: '8px',
                padding: '10px 12px'
              }}
            />
          </Form.Item>

          <Row justify="space-between" align="middle" style={{ marginBottom: '30px' }}>
            <Col>
              <Form.Item<FieldType> 
                name="remember" 
                valuePropName="checked" 
                noStyle
              >
                <Checkbox style={{ color: '#666' }}>
                  记住密码
                </Checkbox>
              </Form.Item>
            </Col>
            <Col>
              <Button 
                type="link" 
                style={{ 
                  padding: 0, 
                  color: '#1890ff',
                  fontWeight: 500
                }}
              >
                忘记密码?
              </Button>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: '16px' }}>
            <Button 
              type="primary" 
              htmlType="submit"
              size="large"
              block
              style={{ 
                height: '48px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(24, 144, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(24, 144, 255, 0.3)';
              }}
            >
              登录
            </Button>
          </Form.Item>

        </Form>
      </Card>
    </div>
  );
}

export default LoginComponent;