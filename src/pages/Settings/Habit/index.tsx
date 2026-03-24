import {
  Form,
  Switch,
  Divider,
  Select,
  Radio,
  InputNumber,
  TimePicker,
} from "antd";
import { useImperativeHandle, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import type { OutletContextType } from "@/types/HabitFormType";
import {
  defaultValues,
  categoryOptions,
  cardLayoutOptions,
  cardsPerRowOptions,
} from "@/data/habitSettingsData";
import { type HabitSettings } from "@/data/habitSettingsData";
import { setDefaultValues } from "@/store/modules/habit";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  DashboardOutlined,
  AppstoreOutlined,
  BarsOutlined,
  NumberOutlined,
  FireOutlined,
  PieChartOutlined,
  BellOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import "@/styles/settings.scss";
import dayjs from "dayjs";

const { Option } = Select;

const HabitSettings = () => {
  const [form] = Form.useForm();
  const { formRef } = useOutletContext<OutletContextType>();
  const dispatch = useDispatch();

  const habitSettingsValues = useSelector(
    (state: RootState) => state.habit?.defaultValues || defaultValues,
  );

  useEffect(() => {
    // 将字符串时间转换为 dayjs 对象
    const initialValues = {
      ...habitSettingsValues,
      reminderTime: habitSettingsValues.reminderTime
        ? dayjs(habitSettingsValues.reminderTime, "HH:mm")
        : null,
    };
    form.setFieldsValue(initialValues);
  }, [habitSettingsValues, form]);

  const handleSave1 = (values: HabitSettings) => {
    // 将 dayjs 对象转换回字符串
    const formattedValues = {
      ...values,
      reminderTime: dayjs.isDayjs(values.reminderTime)
        ? values.reminderTime.format("HH:mm")
        : values.reminderTime,
    };
    console.log("Saving habit settings:", formattedValues);
    dispatch(setDefaultValues(formattedValues));
  };

  useImperativeHandle(formRef, () => ({
    handleSave2: () => {
      form.submit();
    },
    handleReset: () => {
      form.setFieldsValue({
        ...defaultValues,
        reminderTime: defaultValues.reminderTime
          ? dayjs(defaultValues.reminderTime, "HH:mm")
          : null,
      });
      dispatch(setDefaultValues(defaultValues));
    },
  }));

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2 className="settings-title">习惯打卡设置</h2>
        <p className="settings-subtitle">习惯管理和打卡设置</p>
      </div>

      <Form
        form={form}
        onFinish={handleSave1}
        className="settings-form"
        initialValues={{
          ...habitSettingsValues,
          reminderTime: habitSettingsValues.reminderTime
            ? dayjs(habitSettingsValues.reminderTime, "HH:mm")
            : null,
        }}
      >
        {/* 默认目标次数 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <NumberOutlined className="settings-icon" />
              默认目标次数
            </div>
            <p className="settings-description">新建习惯时默认的目标打卡次数</p>
          </div>
          <div className="settings-control">
            <Form.Item name="defaultTargetCount" noStyle>
              <InputNumber min={1} max={365} />
            </Form.Item>
            <span className="settings-unit">次</span>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 默认分类 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <AppstoreOutlined className="settings-icon" />
              默认分类
            </div>
            <p className="settings-description">新建习惯时默认的分类</p>
          </div>
          <div className="settings-control">
            <Form.Item name="defaultCategory" noStyle>
              <Select placeholder="选择分类" style={{ width: 120 }}>
                {categoryOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 3,
                          backgroundColor: option.color,
                        }}
                      />
                      {option.label}
                    </span>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 显示统计卡片 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <DashboardOutlined className="settings-icon" />
              显示统计卡片
            </div>
            <p className="settings-description">在页面顶部显示习惯统计信息</p>
          </div>
          <div className="settings-control">
            <Form.Item name="showStatsCard" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 卡片布局方式 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <BarsOutlined className="settings-icon" />
              卡片布局方式
            </div>
            <p className="settings-description">习惯卡片的排列方式</p>
          </div>
          <div className="settings-control">
            <Form.Item name="cardLayout" noStyle>
              <Radio.Group>
                {cardLayoutOptions.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 每行显示卡片数 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <AppstoreOutlined className="settings-icon" />
              每行显示卡片数
            </div>
            <p className="settings-description">网格布局下每行显示的卡片数量</p>
          </div>
          <div className="settings-control">
            <Form.Item name="cardsPerRow" noStyle>
              <Radio.Group>
                {cardsPerRowOptions.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 显示进度条 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <PieChartOutlined className="settings-icon" />
              显示进度条
            </div>
            <p className="settings-description">在卡片中显示进度条</p>
          </div>
          <div className="settings-control">
            <Form.Item name="showProgressBar" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 显示连续天数 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <FireOutlined className="settings-icon" />
              显示连续天数
            </div>
            <p className="settings-description">在卡片中显示连续打卡天数</p>
          </div>
          <div className="settings-control">
            <Form.Item name="showStreak" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 显示完成率 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <PieChartOutlined className="settings-icon" />
              显示完成率
            </div>
            <p className="settings-description">在卡片中显示完成百分比</p>
          </div>
          <div className="settings-control">
            <Form.Item
              name="showCompletionRate"
              valuePropName="checked"
              noStyle
            >
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 打卡后自动增加天数 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <CheckCircleOutlined className="settings-icon" />
              自动增加连续天数
            </div>
            <p className="settings-description">打卡后自动增加连续天数</p>
          </div>
          <div className="settings-control">
            <Form.Item
              name="autoIncrementStreak"
              valuePropName="checked"
              noStyle
            >
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 允许补打卡 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <RetweetOutlined className="settings-icon" />
              允许补打卡
            </div>
            <p className="settings-description">允许补打漏掉的卡</p>
          </div>
          <div className="settings-control">
            <Form.Item name="allowCatchUp" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 启用提醒 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <BellOutlined className="settings-icon" />
              启用提醒
            </div>
            <p className="settings-description">每天定时提醒打卡</p>
          </div>
          <div className="settings-control">
            <Form.Item name="enableReminder" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Divider className="settings-divider" />

        {/* 提醒时间 */}
        <div className="settings-row">
          <div className="settings-info">
            <div className="settings-label">
              <ClockCircleOutlined className="settings-icon" />
              提醒时间
            </div>
            <p className="settings-description">设置每天的提醒时间</p>
          </div>
          <div className="settings-control">
            <Form.Item name="reminderTime" noStyle>
              <TimePicker format="HH:mm" placeholder="选择时间" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default HabitSettings;
