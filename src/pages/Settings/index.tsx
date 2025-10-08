import { Modal, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import SiderComponent from "@/components/SiderComponent";

function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentPath = location.pathname.replace('/settings', '');
  
  const handleOk = () => {
    message.success('设置已保存');
    handleClose();
  };

  const handleCancel = () => {
    console.log('设置已取消');
    handleClose();
  };

  const handleClose = () => {
    navigate(currentPath);
  };

  return (
    <Modal
      title={`设置`}
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width="100vw"
      style={{
        top: 0,
        padding: 0,
        maxWidth: '100%',
      }}
      bodyStyle={{
        height: '98%',
        padding: 0,
        margin: 0,
        overflow: 'hidden', 
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
          <h3>当前设置页面路由: {location.pathname}</h3>
          <p>来源页面: {currentPath}</p>
          <p>这里是针对 {currentPath} 页面的设置内容...</p>
        </div>
      </div>
    </Modal>
  );
}

export default Settings;