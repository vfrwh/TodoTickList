import React from 'react';
import { Layout, Menu } from 'antd';
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

  const onMenuClick = (e: { key: string }) => {
    const path = e.key;
    navigate(path);
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
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={onMenuClick}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      
      {/* 添加 Content 区域和 Outlet */}
      <Content style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default LayoutComponent;