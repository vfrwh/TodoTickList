import { Modal, message,Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import SiderComponent from "@/components/SiderComponent";
import { Outlet } from "react-router-dom";
import { useRef } from "react";
import type { FocusFormRefType } from "@/types/focusFormType";

function Settings() {
  const navigate = useNavigate();
  const location = useLocation();

  const formRef = useRef<FocusFormRefType | null>(null)

  const currentPath = location.pathname.replace('/settings', '');
  
  const handleOk = () => {
    formRef.current?.handleSave2()
    message.success('设置已保存');
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleClose = () => {
    navigate(currentPath);
  };

  const handleReset = () => {
    formRef.current?.handleReset()
    message.success('已恢复默认设置')
    handleClose();
  }

  return (
    <Modal
      title={`设置`}
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="reset" onClick={handleReset}>
          恢复默认并保存
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          保存设置
        </Button>,
      ]}
      width="100vw"
      style={{
        top: 0,
        padding: 0,
        maxWidth: '100%',
      }}

      styles={{
        body: {
          height: '98%',
          padding: 0,
          margin: 0,
          overflow: 'hidden', 
        },
        footer: {
          gap:'10px',
          display: 'flex',
          justifyContent: 'flex-end'
        }
      }}
    >
      <div style={{ 
        display: 'flex', 
        height: '80%',
        minHeight: 'calc(100vh - 108px)'
      }}>
        <SiderComponent currentPath={currentPath} />
        <div style={{ 
          flex: 1, 
          padding: '24px',
          overflow: 'hidden'
        }}>
          <Outlet context={{ formRef }} />
        </div>
      </div>
    </Modal>
  );
}

export default Settings;