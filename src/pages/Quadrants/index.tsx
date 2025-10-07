import { Form,DatePicker,Button,Drawer ,Select,Input} from "antd"
import { useState } from "react";
function Quadrants() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const { Option } = Select;
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (value:any) => {
    console.log(value)
  }

  const onPriorityChange = () => {
   
  };
  
  return (
    <>
    <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
    <Drawer
      closable
        destroyOnHidden
        title={<p>新增数据</p>}
        placement="right"
        open={open}
        onClose={onClose}
    >
      <Form
      form={form}
        onFinish={onFinish}
      >
        <Form.Item name="taskName" label="任务名字" rules={[{ required: true }]}>
          <Input placeholder="请输入任务名字"/>
        </Form.Item>
        <Form.Item name="priority" label="优先级" rules={[{ required: true }]}>
          <Select
            placeholder="请选择优先级"
            onChange={onPriorityChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item name="date-picker" label="DatePicker" >
          <DatePicker />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
      
    </>
  )
}

export default Quadrants
