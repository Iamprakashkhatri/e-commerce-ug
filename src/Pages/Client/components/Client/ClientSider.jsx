import React from 'react';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  SmileOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import './style/style.scss';
import { useSelector } from 'react-redux';

const ClientSider = () => {
  const { userInfo } = useSelector((state) => state.userInfo);

  return (
    <>
      <Menu style={{ marginTop: '1.9rem' }} className="navformobile">
        <Menu.Item icon={<DashboardOutlined />}>
          <NavLink to="/client">Dashboard</NavLink>
        </Menu.Item>
        {(userInfo && userInfo.user.is_admin) ||
        (userInfo && userInfo.user.is_superadmin) ? null : (
          <Menu.Item icon={<ShoppingCartOutlined />}>
            <NavLink to="/order">Order</NavLink>
          </Menu.Item>
        )}
        {(userInfo && userInfo.user.is_admin) ||
        (userInfo && userInfo.user.is_superadmin) ? null : (
          <Menu.Item icon={<HeartOutlined />}>
            <NavLink to="/wishlist">Wishlist</NavLink>
          </Menu.Item>
        )}
        <Menu.Item icon={<SettingOutlined />}>
          <NavLink to="/settings">Settings</NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default ClientSider;
