import { Form, Switch, Divider, Select, Radio } from "antd";
import { useImperativeHandle, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import type {
  quadrantsFormType,
  OutletContextType,
} from "@/types/quadrantsFormType";
import {
  defaultValues,
  cardSizeOptions,
  sortOptions,
} from "@/data/quadrantsSettingsData";
import { setDefaultValues } from "@/store/modules/quadrants";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  BarsOutlined,
  TagOutlined,
  CalendarOutlined,
  ColumnHeightOutlined,
  HighlightOutlined,
  SortAscendingOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "@/styles/settings.scss";

const { Option } = Select;

const QuadrantsSettings = () => {
  const [form] = Form.useForm();
  const { formRef } = useOutletContext<OutletContextType>();
  const dispatch = useDispatch();

  // 从 Redux 获取设置
  const quadrantsSettingsValues = useSelector(
    (state: RootState) => state.quadrants?.defaultValues || defaultValues,
  );

  // 当 Redux 中的设置变化时，更新表单
  useEffect(() => {
    form.setFieldsValue(quadrantsSettingsValues);
  }, [quadrantsSettingsValues, form]);

  const handleSave1 = (values: quadrantsFormType) => {
    console.log("Saving settings:", values); // 调试用
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
        <h2 className="settings-title">四象限设置</h2>
        <p className="settings-subtitle">四象限矩阵显示和功能设置</p>
      </div>

      <Form
        form={form}
        onFinish={handleSave1}
        className="settings-form"
        initialValues={quadrantsSettingsValues}
      >
        {/* 显示任务数量 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <BarsOutlined className="settings-icon" />
              显示任务数量
            </div>
            <p className="settings-description">
              在卡片头部显示每个象限的任务数量
            </p>
          </div>
          <div className="settings-control">
            <Form.Item name="showTaskCount" valuePropName="checked" noStyle>
              <Switch />
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
            <p className="settings-description">在任务列表中显示任务标签</p>
          </div>
          <div className="settings-control">
            <Form.Item name="showTaskTags" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 显示截止时间 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <CalendarOutlined className="settings-icon" />
              显示截止时间
            </div>
            <p className="settings-description">在任务列表中显示截止时间</p>
          </div>
          <div className="settings-control">
            <Form.Item name="showDeadline" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 卡片大小 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <ColumnHeightOutlined className="settings-icon" />
              卡片大小
            </div>
            <p className="settings-description">调整每个象限卡片的高度</p>
          </div>
          <div className="settings-control">
            <Form.Item name="cardSize" noStyle>
              <Radio.Group>
                {cardSizeOptions.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 悬停效果 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <HighlightOutlined className="settings-icon" />
              启用悬停效果
            </div>
            <p className="settings-description">
              鼠标悬停在卡片上时显示动画效果
            </p>
          </div>
          <div className="settings-control">
            <Form.Item name="enableHoverEffect" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 默认排序方式 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <SortAscendingOutlined className="settings-icon" />
              默认排序方式
            </div>
            <p className="settings-description">任务列表的默认排序规则</p>
          </div>
          <div className="settings-control">
            <Form.Item name="defaultSortBy" noStyle>
              <Select placeholder="选择排序方式" style={{ width: 150 }}>
                {sortOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 显示空状态提示 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <EyeOutlined className="settings-icon" />
              显示空状态提示
            </div>
            <p className="settings-description">
              当象限中没有任务时显示空状态提示
            </p>
          </div>
          <div className="settings-control">
            <Form.Item name="showEmptyHint" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default QuadrantsSettings;
