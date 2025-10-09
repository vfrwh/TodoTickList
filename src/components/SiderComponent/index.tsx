// SiderComponent.tsx
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { layoutData } from '@/data/layoutData';
import { useNavigate } from 'react-router-dom';
import type { SiderComponentProps } from '@/types/SettingsType';

const menuItems = Object.values(layoutData).map((item) => ({
  key: String(item.key),
  label: item.title,
}));

const SiderComponent = ({ currentPath }: SiderComponentProps) => {
  const navigate = useNavigate()
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(`/settings${e.key}`);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      selectedKeys={[currentPath]} // 高亮当前页面菜单项
      mode="inline"
      items={menuItems}
    />
  );
}

export default SiderComponent;