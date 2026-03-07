import {
  Drawer,
  Input,
  Form,
  Select,
  Space,
  Button,
  DatePicker,
  message,
} from "antd";
import type {
  DrawerDetailsProps,
  DrawerFormTypes,
} from "@/types/listDrawerDetailsType";
import { changeListAPI, addListAPI } from "@/apis/list";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useEffect } from "react";

const { Option } = Select;

const DrawerDetails = ({ open, isEdit, onClose }: DrawerDetailsProps) => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();

  // 获取设置中的默认优先级
  const listSettings = useSelector(
    (state: RootState) => state.list.defaultValues,
  );

  // 通过url获取id
  const editId = Number(searchParams.get("id"));

  // 初始化表单值
  useEffect(() => {
    if (open && !isEdit) {
      // 新增时设置默认优先级
      form.setFieldsValue({
        priority: listSettings.defaultPriority,
      });
    }
  }, [open, isEdit, form, listSettings.defaultPriority]);

  const onFinish = async (value: DrawerFormTypes) => {
    const submitData = editId ? { ...value, id: editId } : value;
    const isEdit = !!editId;

    try {
      if (isEdit) {
        await changeListAPI(submitData);
      } else {
        await addListAPI(submitData);
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
    // 重置后重新设置默认优先级
    if (!isEdit) {
      form.setFieldsValue({
        priority: listSettings.defaultPriority,
      });
    }
  };

  return (
    <Drawer
      closable
      destroyOnClose
      title={<p>{isEdit ? "编辑任务" : "新增任务"}</p>}
      placement="right"
      open={open}
      onClose={onClose}
      width={500}
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="basic"
        onFinish={onFinish}
        style={{ maxWidth: "100%" }}
        initialValues={{
          priority: listSettings.defaultPriority,
        }}
      >
        <Form.Item
          name="taskName"
          label="任务名称"
          rules={[{ required: true, message: "请填写任务名称" }]}
        >
          <Input placeholder="请输入任务名称" />
        </Form.Item>

        <Form.Item
          name="priority"
          label="优先级"
          rules={[{ required: true, message: "请选择优先级" }]}
        >
          <Select placeholder="请选择优先级">
            <Option value="high">高优先级</Option>
            <Option value="medium">中优先级</Option>
            <Option value="low">低优先级</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="date"
          label="截止日期"
          rules={[{ required: true, message: "请选择截止日期" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DrawerDetails;
