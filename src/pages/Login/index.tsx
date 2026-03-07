import { Button, Checkbox, Form, Input, Card, Row, Col, message } from "antd";
import type { FormProps } from "antd";
import type { FieldType } from "../../types/loginFormType";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "@/apis/login/index";
import { setToken } from "@/utils/token";

function LoginComponent() {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      if (values.username === "admin" && values.password === "123456") {
        // 模拟管理员登录成功 - 使用特殊前缀标记为管理员token
        const mockToken = "admin_mock_token_" + Date.now();
        setToken(mockToken, true); // 传入true标记为管理员token
        message.success("管理员登录成功！");
        navigate("/");
        return;
      }
      const res = await loginAPI({
        username: values.username,
        password: values.password,
      });

      // 根据状态码判断
      if (res.status === 1001) {
        message.error(res.statusText);
        return;
      }

      if (res.data && res.data.token) {
        setToken(res.data.token, false); // 普通用户token
        message.success("登录成功！");
        navigate("/");
      } else {
        message.error("登录失败，请重试！");
      }
    } catch (error) {
      console.error("登录出错:", error);
      message.error("登录失败，请检查网络连接！");
    }
  };

  const toRegister = () => {
    navigate("/register");
  };

  const toForget = () => {
    navigate("/forget");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "12px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          padding: "20px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#1890ff",
              margin: 0,
            }}
          >
            用户登录
          </h2>
          <p
            style={{
              color: "#666",
              marginTop: "8px",
              fontSize: "14px",
            }}
          >
            欢迎回来，请登录您的账户
          </p>
        </div>

        <Form
          name="basic"
          layout="vertical"
          style={{ width: "100%" }}
          initialValues={{
            username: "admin",
            password: "123456",
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label={<span style={{ fontWeight: 500 }}>用户名</span>}
            name="username"
            rules={[{ required: true, message: "请输入用户名!" }]}
            style={{ marginBottom: "20px" }}
          >
            <Input
              size="large"
              placeholder="请输入用户名"
              style={{
                borderRadius: "8px",
                padding: "10px 12px",
              }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label={<span style={{ fontWeight: 500 }}>密码</span>}
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
            style={{ marginBottom: "24px" }}
          >
            <Input.Password
              size="large"
              placeholder="请输入密码"
              style={{
                borderRadius: "8px",
                padding: "10px 12px",
              }}
            />
          </Form.Item>

          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "30px" }}
          >
            <Col>
              <Form.Item<string>
                name="remember"
                valuePropName="checked"
                noStyle
              >
                <Checkbox style={{ color: "#666" }}>记住密码</Checkbox>
              </Form.Item>
            </Col>
            <Col>
              <Button
                type="link"
                style={{
                  padding: 0,
                  color: "#1890ff",
                  fontWeight: 500,
                }}
                onClick={toForget}
              >
                忘记密码?
              </Button>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: "16px" }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              style={{
                height: "48px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(24, 144, 255, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 16px rgba(24, 144, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(24, 144, 255, 0.3)";
              }}
            >
              登录
            </Button>
          </Form.Item>

          <div
            style={{
              textAlign: "center",
              marginTop: "24px",
              color: "#666",
              fontSize: "14px",
            }}
          >
            还没有账户?
            <Button
              type="link"
              onClick={toRegister}
              style={{
                padding: "0 4px",
                color: "#1890ff",
                fontWeight: 500,
              }}
            >
              立即注册
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default LoginComponent;
