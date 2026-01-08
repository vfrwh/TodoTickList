import { Button, Form, Input, Card, Row, Col, message } from 'antd';
import type { FormProps } from 'antd';
import type { FieldType } from '@/types/forgetPasswordFormType';
import { useNavigate } from 'react-router-dom';
import { useCaptcha } from '@/hooks/useCaptcha';
import { debounce } from 'lodash';
import { useEffect, useMemo } from 'react';
import { forgetPasswordAPI } from '@/apis/forget';

function ResetPasswordComponent() {

  const { image, captchaId,fetchCaptcha } = useCaptcha();

  const debouncedFetchCaptcha = useMemo(
    () => debounce(fetchCaptcha, 500, { leading: true, trailing: false }),
    [fetchCaptcha]
  );

  useEffect(() => {
    return () => {
      debouncedFetchCaptcha.cancel?.();
    };
  }, [debouncedFetchCaptcha]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const res = await forgetPasswordAPI({
        username: values.username,
        captcha: values.captcha,
        captchaId: captchaId,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword
      });
      if(res.status === 200) {
        message.success('密码重置成功!');
        navigater('/login');
      } else {
        message.error(res.statusText || '密码重置失败，请重试！');
      }
    } catch (error) {
      message.error('密码重置失败，请重试！');
      console.error('密码重置出错:', error);
    }
  };


  const navigater = useNavigate();
  const toLogin = () => {
    navigater('/login');
  }

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
            忘记密码
          </h2>
          <p style={{ 
            color: '#666', 
            marginTop: '8px',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            请输入用户名和图形验证码，然后设置新密码
          </p>
        </div>

        <Form
          name="resetPassword"
          layout="vertical"
          style={{ width: '100%' }}
          onFinish={onFinish}
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
              placeholder="请输入您的用户名"
              style={{ 
                borderRadius: '8px',
                padding: '10px 12px'
              }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label={<span style={{ fontWeight: 500 }}>图形验证码</span>}
            name="captcha"
            rules={[{ required: true, message: '请输入图形验证码!' }]}
            style={{ marginBottom: '20px' }}
          >
            <Row gutter={12}>
              <Col span={16}>
                <Input 
                  size="large" 
                  placeholder="请输入右侧验证码"
                  style={{ 
                    borderRadius: '8px',
                    padding: '10px 12px'
                  }}
                />
              </Col>
              <Col span={8}>
                {image && (
                  <img 
                    src={image} 
                    alt="验证码" 
                    onClick={fetchCaptcha}
                    style={{ cursor: 'pointer' }}
                  />
                )}
              </Col>
            </Row>
          </Form.Item>

          <Form.Item<FieldType>
            label={<span style={{ fontWeight: 500 }}>新密码</span>}
            name="newPassword"
            rules={[{ required: true, message: '请输入新密码!' }]}
            style={{ marginBottom: '20px' }}
          >
            <Input.Password 
              size="large" 
              placeholder="请输入新密码"
              style={{ 
                borderRadius: '8px',
                padding: '10px 12px'
              }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label={<span style={{ fontWeight: 500 }}>确认新密码</span>}
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '请确认新密码!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致!'));
                },
              }),
            ]}
            style={{ marginBottom: '30px' }}
          >
            <Input.Password 
              size="large" 
              placeholder="请确认新密码"
              style={{ 
                borderRadius: '8px',
                padding: '10px 12px'
              }}
            />
          </Form.Item>

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
              重置密码
            </Button>
          </Form.Item>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '24px',
            color: '#666',
            fontSize: '14px'
          }}>
            记起密码了? 
            <Button 
              type="link" 
              style={{ 
                padding: '0 4px',
                color: '#1890ff',
                fontWeight: 500
              }}
              onClick={toLogin}
            >
              返回登录
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default ResetPasswordComponent;