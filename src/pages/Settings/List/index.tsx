import { Form, Switch, Divider, Select, Radio } from "antd";
import { useImperativeHandle } from "react";
import { useOutletContext } from "react-router-dom";
import type { listFormType, OutletContextType } from "@/types/listFormType";
import { defaultValues } from "@/data/listSettingsData";
import { setDefaultValues } from "@/store/modules/list";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  FlagOutlined,
  SortAscendingOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  CalendarOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import "@/styles/settings.scss"; // 引入统一的样式文件

const { Option } = Select;

const ListSettings = () => {
  const [form] = Form.useForm();
  const { formRef } = useOutletContext<OutletContextType>();
  const dispatch = useDispatch();

  const handleSave1 = (values: listFormType) => {
    dispatch(setDefaultValues(values));
  };

  const listSettingsValues = useSelector(
    (state: RootState) => state.list.defaultValues,
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
        <h2 className="settings-title">任务清单设置</h2>
        <p className="settings-subtitle">任务管理和显示设置</p>
      </div>

      <Form
        form={form}
        onFinish={handleSave1}
        className="settings-form"
        initialValues={listSettingsValues}
      >
        {/* 默认优先级 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <FlagOutlined className="settings-icon" />
              默认优先级
            </div>
            <p className="settings-description">新建任务时默认的优先级</p>
          </div>
          <div className="settings-control">
            <Form.Item name="defaultPriority" noStyle>
              <Select placeholder="选择优先级">
                <Option value="high">高优先级</Option>
                <Option value="medium">中优先级</Option>
                <Option value="low">低优先级</Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 排序方式 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <SortAscendingOutlined className="settings-icon" />
              默认排序
            </div>
            <p className="settings-description">任务的默认排序方式</p>
          </div>
          <div className="settings-control">
            <Form.Item name="sortBy" noStyle>
              <Select placeholder="选择排序方式">
                <Option value="createTimeDesc">创建时间(新→旧)</Option>
                <Option value="createTimeAsc">创建时间(旧→新)</Option>
                <Option value="priorityDesc">优先级(高→低)</Option>
                <Option value="priorityAsc">优先级(低→高)</Option>
                <Option value="nameAsc">任务名称(A→Z)</Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 显示已完成任务 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <CheckCircleOutlined className="settings-icon" />
              显示已完成任务
            </div>
            <p className="settings-description">在列表中是否显示已完成的任务</p>
          </div>
          <div className="settings-control">
            <Form.Item name="showCompleted" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 显示任务描述 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <FileTextOutlined className="settings-icon" />
              显示任务描述
            </div>
            <p className="settings-description">在列表中是否显示任务详细描述</p>
          </div>
          <div className="settings-control">
            <Form.Item name="showDescription" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 显示创建时间 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <CalendarOutlined className="settings-icon" />
              显示创建时间
            </div>
            <p className="settings-description">在列表中是否显示任务创建时间</p>
          </div>
          <div className="settings-control">
            <Form.Item name="showCreateTime" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 默认视图模式 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <AppstoreOutlined className="settings-icon" />
              默认视图模式
            </div>
            <p className="settings-description">任务的默认展示模式</p>
          </div>
          <div className="settings-control">
            <Form.Item name="viewMode" noStyle>
              <Radio.Group>
                <Radio value="list">列表视图</Radio>
                <Radio value="card">卡片视图</Radio>
                <Radio value="compact">紧凑视图</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ListSettings;
