// LayoutComponent.tsx
import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { layoutData } from '@/data/layoutData';

const { Header, Content } = Layout;

const menuItems = Object.values(layoutData).map((item) => ({
  key: String(item.key),
  label: item.title,
}));

const LayoutComponent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const onMenuClick = (e: { key: string }) => {
    const path = e.key;
    navigate(path);
  };

  const onSettings = () => {
    // 直接在当前路由后添加 /settings
    navigate(`${path}/settings`);
  };

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          selectedKeys={[path]}
          items={menuItems}
          onClick={onMenuClick}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Button 
          type="primary"
          onClick={onSettings}
        >
          设置
        </Button>
      </Header>
      <Content style={{ 
        padding: '24px', 
        minHeight: 'calc(100vh - 64px)', 
        backgroundColor: "#f5f5f5"
      }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default LayoutComponent;