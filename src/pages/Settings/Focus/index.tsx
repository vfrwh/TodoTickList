import { Form, InputNumber, Switch, Divider } from "antd"
import './index.scss'
import { useImperativeHandle } from "react"
import { useOutletContext } from "react-router-dom"
import type { focusFormType, OutletContextType } from "@/types/focusFormType"
import { defaultValues } from "@/data/focusSettingsData"
import { setDefaultValues } from "@/store/modules/focus"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store"

const FocusSettings = () => {
  const [form] = Form.useForm()
  const { formRef } = useOutletContext<OutletContextType>()
  const dispatch = useDispatch()

  const handleSave1 = (values: focusFormType) => {
    // 保存设置到仓库
    dispatch(setDefaultValues(values))
  }

  const focusSettingsValues = useSelector((state:RootState) => state.focus.defaultValues)

  // 暴露 handleSave 方法
  useImperativeHandle(formRef, () => ({
    handleSave2: () => {
      form.submit() // 触发表单提交，会调用 handleSave1
    },

    handleReset: () => {
      form.setFieldsValue(defaultValues)
    }
  }))

  return (
    <div className="focus-settings">
      <div className="header">
        <h2 className="title">番茄专注</h2>
        <p className="subtitle">番茄工作法和专注计时设置</p>
      </div>
      
      <Form
        form={form}
        onFinish={handleSave1}
        style={{ maxWidth: '100%' }}
        initialValues={focusSettingsValues}
      >
        {/* 专注时间 */}
        <div className="setting-row">
          <div className="setting-info">
            <h3 className="section-title">专注时间</h3>
            <p className="section-desc">每个番茄专注时段的长度（分钟）</p>
          </div>
          <div className="setting-control">
            <Form.Item name="focusTime" noStyle>
              <InputNumber 
                min={1} 
                max={60}
                style={{ width: '100px' }}
              />
            </Form.Item>
            <span className="unit">分钟</span>
          </div>
        </div>

        <Divider className="divider" />

        {/* 短休息时间 */}
        <div className="setting-row">
          <div className="setting-info">
            <h3 className="section-title">短休息时间</h3>
            <p className="section-desc">短休息时段的长度（分钟）</p>
          </div>
          <div className="setting-control">
            <Form.Item name="shortBreak" noStyle>
              <InputNumber 
                min={1} 
                max={15}
                style={{ width: '100px' }}
              />
            </Form.Item>
            <span className="unit">分钟</span>
          </div>
        </div>

        <Divider className="divider" />

        {/* 长休息时间 */}
        <div className="setting-row">
          <div className="setting-info">
            <h3 className="section-title">长休息时间</h3>
            <p className="section-desc">长休息时段的长度（分钟）</p>
          </div>
          <div className="setting-control">
            <Form.Item name="longBreak" noStyle>
              <InputNumber 
                min={10} 
                max={30}
                style={{ width: '100px' }}
              />
            </Form.Item>
            <span className="unit">分钟</span>
          </div>
        </div>

        <Divider className="divider" />

        {/* 自动开始休息 */}
        <div className="setting-row">
          <div className="setting-info">
            <h3 className="section-title">自动开始休息</h3>
            <p className="section-desc">专注时间结束后自动开始休息计时</p>
          </div>
          <div className="setting-control">
            <Form.Item 
              name="autoStartBreak" 
              valuePropName="checked"
              noStyle
            >
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="divider" />

        {/* 显示进度环 */}
        <div className="setting-row">
          <div className="setting-info">
            <h3 className="section-title">显示进度环</h3>
            <p className="section-desc">在番茄计时器中显示进度环</p>
          </div>
          <div className="setting-control">
            <Form.Item 
              name="showProgressRing" 
              valuePropName="checked"
              noStyle
            >
              <Switch />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default FocusSettings