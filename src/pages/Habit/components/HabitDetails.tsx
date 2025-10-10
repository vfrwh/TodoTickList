import { Drawer,Input,Form,Space,Button,InputNumber,message } from "antd"
import type { HabitDetailsProps,HabitFormTypes } from "@/types/HabitFormType"; 
import { changeHabitAPI,addHabitAPI } from "@/apis/habit";
import { useSearchParams } from "react-router-dom";

const HabitDetails = ({open,isEdit,onClose}:HabitDetailsProps) => {
  const [form] = Form.useForm();

  const [searchParams] = useSearchParams()

  // 通过url获取id
  const editId = Number(searchParams.get('id'))
  const onFinish = async (value: HabitFormTypes) => {
    console.log(value)
  const submitData = editId ? { ...value, id: editId } : value;
  const isEdit = !!editId;
  
  try {
    if (isEdit) {
      await changeHabitAPI(submitData);
    } else {
      await addHabitAPI(submitData);
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
        
        <Form.Item name="count" label="总次数" rules={[{ required: true,message:'请填写打卡总次数' }]}>
            <InputNumber 
              defaultValue={1}
              min={1} 
              max={60}
              style={{ width: '120px' }}
              suffix="次"
            />
        </Form.Item>
        
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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

export default HabitDetails