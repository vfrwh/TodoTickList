import { Form, InputNumber, Switch, Divider } from "antd";
import { useImperativeHandle } from "react";
import { useOutletContext } from "react-router-dom";
import type { focusFormType, OutletContextType } from "@/types/focusFormType";
import { defaultValues } from "@/data/focusSettingsData";
import { setDefaultValues } from "@/store/modules/focus";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  ClockCircleOutlined,
  SyncOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import "@/styles/settings.scss"; // 引入统一的样式文件

const FocusSettings = () => {
  const [form] = Form.useForm();
  const { formRef } = useOutletContext<OutletContextType>();
  const dispatch = useDispatch();

  const handleSave1 = (values: focusFormType) => {
    dispatch(setDefaultValues(values));
  };

  const focusSettingsValues = useSelector(
    (state: RootState) => state.focus.defaultValues,
  );

  useImperativeHandle(formRef, () => ({
    handleSave2: () => {
      form.submit();
    },
    handleReset: () => {
      form.setFieldsValue(defaultValues);
      dispatch(setDefaultValues(defaultValues));
    },
  }));

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2 className="settings-title">专注盒子设置</h2>
        <p className="settings-subtitle">专注工作法和专注计时设置</p>
      </div>

      <Form
        form={form}
        onFinish={handleSave1}
        className="settings-form"
        initialValues={focusSettingsValues}
      >
        {/* 专注时间 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <ClockCircleOutlined className="settings-icon" />
              专注时间
            </div>
            <p className="settings-description">每个专注时段的长度（分钟）</p>
          </div>
          <div className="settings-control">
            <Form.Item name="focusTime" noStyle>
              <InputNumber min={1} max={60} />
            </Form.Item>
            <span className="settings-unit">分钟</span>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 短休息时间 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <ClockCircleOutlined className="settings-icon" />
              短休息时间
            </div>
            <p className="settings-description">短休息时段的长度（分钟）</p>
          </div>
          <div className="settings-control">
            <Form.Item name="shortBreak" noStyle>
              <InputNumber min={1} max={15} />
            </Form.Item>
            <span className="settings-unit">分钟</span>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 长休息时间 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <ClockCircleOutlined className="settings-icon" />
              长休息时间
            </div>
            <p className="settings-description">长休息时段的长度（分钟）</p>
          </div>
          <div className="settings-control">
            <Form.Item name="longBreak" noStyle>
              <InputNumber min={1} max={30} />
            </Form.Item>
            <span className="settings-unit">分钟</span>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 自动开始休息 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <SyncOutlined className="settings-icon" />
              自动开始休息
            </div>
            <p className="settings-description">
              专注时间结束后自动开始休息计时
            </p>
          </div>
          <div className="settings-control">
            <Form.Item name="autoStartBreak" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 显示进度环 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <PieChartOutlined className="settings-icon" />
              显示进度环
            </div>
            <p className="settings-description">在计时器中显示进度环</p>
          </div>
          <div className="settings-control">
            <Form.Item name="showProgressRing" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FocusSettings;
