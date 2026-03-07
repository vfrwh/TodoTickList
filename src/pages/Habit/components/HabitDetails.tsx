import {
  Drawer,
  Input,
  Form,
  Space,
  Button,
  InputNumber,
  message,
  Select,
} from "antd";
import { SaveOutlined, UndoOutlined, CloseOutlined } from "@ant-design/icons";
import type { HabitDetailsProps, HabitFormTypes } from "@/types/HabitFormType";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { categoryColors } from "@/data/habitData";
import "./index.scss";

const { Option } = Select;

const HabitDetails = ({
  open,
  isEdit,
  onClose,
  habitData,
  onSave,
}: HabitDetailsProps) => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();

  // 通过url获取id
  const editId = Number(searchParams.get("id"));

  // 编辑时填充表单
  useEffect(() => {
    if (isEdit && habitData) {
      form.setFieldsValue({
        taskName: habitData.title,
        sign: habitData.sign,
        count: habitData.total,
        category: habitData.category,
      });
    } else {
      form.resetFields();
    }
  }, [isEdit, habitData, form]);

  const onFinish = async (value: HabitFormTypes) => {
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 调用父组件的保存方法
      if (onSave) {
        onSave(value);
      }

      message.success(`${isEdit ? "修改" : "添加"}成功`);
      onClose();
    } catch (error) {
      message.error(`${isEdit ? "修改" : "添加"}失败`);
      console.log(error);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  // 获取分类颜色
  const getCategoryColor = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || "#1890ff";
  };

  return (
    <Drawer
      title={
        <div className="drawer-title">
          <span className="drawer-title-icon">{isEdit ? "✏️" : "➕"}</span>
          <span>{isEdit ? "编辑习惯" : "新建习惯"}</span>
        </div>
      }
      placement="right"
      open={open}
      onClose={onClose}
      width={520}
      className="habit-drawer"
      closeIcon={<CloseOutlined />}
      footer={
        <div className="drawer-footer">
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              form="habitForm"
              icon={<SaveOutlined />}
              className="submit-btn"
            >
              保存
            </Button>
            <Button
              htmlType="button"
              onClick={onReset}
              icon={<UndoOutlined />}
              className="reset-btn"
            >
              重置
            </Button>
          </Space>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        name="habitForm"
        id="habitForm"
        onFinish={onFinish}
        requiredMark="optional"
        className="habit-form"
        initialValues={{ count: 30 }}
      >
        <Form.Item
          name="taskName"
          label="习惯名称"
          rules={[{ required: true, message: "请输入习惯名称" }]}
          tooltip="给习惯起一个简洁的名字"
        >
          <Input
            placeholder="例如：每天阅读30分钟"
            size="large"
            className="form-input"
          />
        </Form.Item>

        <Form.Item
          name="sign"
          label="习惯口号"
          rules={[{ required: true, message: "请输入习惯口号" }]}
          tooltip="激励自己的口号"
        >
          <Input
            placeholder="例如：坚持就是胜利"
            size="large"
            className="form-input"
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="习惯分类"
          rules={[{ required: true, message: "请选择习惯分类" }]}
        >
          <Select placeholder="选择分类" size="large" className="form-select">
            {Object.entries(categoryColors).map(([category, color]) => (
              <Option key={category} value={category}>
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 3,
                      backgroundColor: color,
                    }}
                  />
                  {category}
                </span>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="count"
          label="目标次数"
          rules={[{ required: true, message: "请输入打卡总次数" }]}
        >
          <InputNumber
            min={1}
            max={365}
            style={{ width: "100%" }}
            size="large"
            className="form-input-number"
            addonAfter="次"
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default HabitDetails;
