import { Form, Switch, Divider, Select, Radio } from "antd";
import { useImperativeHandle, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import type {
  timelineFormType,
  OutletContextType,
} from "@/types/timelineFormType";
import {
  defaultValues,
  colorSchemeOptions,
  maxTasksOptions,
} from "@/data/timelineSettingsData";
import { setDefaultValues } from "@/store/modules/timeline";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  DashboardOutlined,
  TagOutlined,
  ToolOutlined,
  DragOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import "@/styles/settings.scss";

const { Option } = Select;

const TimelineSettings = () => {
  const [form] = Form.useForm();
  const { formRef } = useOutletContext<OutletContextType>();
  const dispatch = useDispatch();

  const timelineSettingsValues = useSelector(
    (state: RootState) => state.timeline?.defaultValues || defaultValues,
  );

  useEffect(() => {
    form.setFieldsValue(timelineSettingsValues);
  }, [timelineSettingsValues, form]);

  const handleSave1 = (values: timelineFormType) => {
    console.log("Saving timeline settings:", values);
    dispatch(setDefaultValues(values));
  };

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
        <h2 className="settings-title">时间线设置</h2>
        <p className="settings-subtitle">日历和任务显示设置</p>
      </div>

      <Form
        form={form}
        onFinish={handleSave1}
        className="settings-form"
        initialValues={timelineSettingsValues}
      >
        {/* 显示底部统计 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <DashboardOutlined className="settings-icon" />
              显示底部统计
            </div>
            <p className="settings-description">在底部显示任务统计信息</p>
          </div>
          <div className="settings-control">
            <Form.Item name="showFooterStats" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 任务颜色方案 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <TagOutlined className="settings-icon" />
              任务颜色方案
            </div>
            <p className="settings-description">任务颜色的区分方式</p>
          </div>
          <div className="settings-control">
            <Form.Item name="taskColorScheme" noStyle>
              <Radio.Group>
                {colorSchemeOptions.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 任务数量限制 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <NumberOutlined className="settings-icon" />
              每日任务显示上限
            </div>
            <p className="settings-description">每天最多显示的任务数量</p>
          </div>
          <div className="settings-control">
            <Form.Item name="maxTasksPerDay" noStyle>
              <Select placeholder="选择数量" style={{ width: 120 }}>
                {maxTasksOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 显示任务标签 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <TagOutlined className="settings-icon" />
              显示任务标签
            </div>
            <p className="settings-description">在任务后面显示标签</p>
          </div>
          <div className="settings-control">
            <Form.Item name="showTaskTags" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 启用工具提示 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <ToolOutlined className="settings-icon" />
              启用工具提示
            </div>
            <p className="settings-description">鼠标悬停时显示任务详情</p>
          </div>
          <div className="settings-control">
            <Form.Item name="enableTooltip" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 允许拖拽 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <DragOutlined className="settings-icon" />
              允许拖拽
            </div>
            <p className="settings-description">允许拖拽任务到其他日期</p>
          </div>
          <div className="settings-control">
            <Form.Item name="allowDrag" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default TimelineSettings;
