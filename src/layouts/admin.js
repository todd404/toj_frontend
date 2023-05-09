import { useState, useEffect } from 'react';
import {
  DesktopOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from "umi"

const { Header, Content, Footer, Sider } = Layout;


function getItem(
	label,
	key,
	icon,
	children,
) {
	return {
		key,
		icon,
		children,
		label,
	};
}
  
const items = [
	getItem('问题管理', '1', <DesktopOutlined />),
	getItem('添加问题', '2', <PlusCircleOutlined/>),
	getItem('用户管理', '3', <UserOutlined/>),
];
  

export default function Admin(){
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ height: '100%' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
          </Sider>
          <Layout className="site-layout">
            <Header style={{ padding: 0, }} />
            <Content style={{ margin: '0 16px', overflow: "auto" }}>
              <Outlet></Outlet>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
          </Layout>
        </Layout>
    );
}