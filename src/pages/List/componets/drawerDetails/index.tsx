import { Drawer,Input,Form,Select,Space,Button,DatePicker,message } from "antd"
import type { DrawerDetailsProps,DrawerFormTypes } from "@/types/listDrawerDetailsType"
import { changeListAPI,addListAPI } from "@/apis/list";
import { useSearchParams } from "react-router-dom";

const DrawerDetails = ({open,isEdit,onClose}:DrawerDetailsProps) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const onPriorityChange = () => {
   
  };

  const [searchParams] = useSearchParams()

  // 通过url获取id
  const editId = Number(searchParams.get('id'))
  const onFinish = async (value: DrawerFormTypes) => {
  const submitData = editId ? { ...value, id: editId } : value;
  const isEdit = !!editId;
  
  try {
    if (isEdit) {
      await changeListAPI(submitData);
    } else {
      await addListAPI(submitData);
    }
    message.success(`${isEdit ? '修改' : '添加'}成功`);
    onClose();
  } catch (error) {
    message.error(`${isEdit ? '修改' : '添加'}失败`);
    console.log(error);
  }
}

  const onReset = () => {
    form.resetFields();
  };

  
  return <>
    <Drawer
        closable
        destroyOnHidden
        title={<p>{isEdit?'编辑数据':'新增数据'}</p>}
        placement="right"
        open={open}
        onClose={onClose}
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="basic"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
      >
        <Form.Item name="taskName" label="任务名字" rules={[{ required: true,message:'请填写任务名字' }]}>
          <Input placeholder="请输入任务名字"/>
        </Form.Item>
        <Form.Item name="priority" label="优先级" rules={[{ required: true,message:'请填写优先级' }]}>
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
        <Form.Item name="date-picker" label="日期" rules={[{ required: true, message:'请填写日期' }]}>
         
            <DatePicker />
         
        </Form.Item>
      
        <Form.Item  wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button htmlType="button" onClick={onReset}>
              清空
            </Button>
          </Space>
        </Form.Item>
      </Form>
        
    </Drawer>
  </>
}

export default DrawerDetails