import { useState, useEffect } from 'react';
import {
  DesktopOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Outlet, useSelectedRoutes, useNavigate } from "umi"

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
	getItem('问题管理', 'problem-manager', <DesktopOutlined />),
	getItem('添加问题', 'add-problem', <PlusCircleOutlined/>),
	getItem('用户管理', 'user-manager', <UserOutlined/>),
];
  
//TODO: 验证是否为admin
export default function Admin(){
    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState("problem-manager");

    const routes = useSelectedRoutes();
    const navigate = useNavigate();

    const onSelectedChange = (key)=>{
      navigate(`/admin/${key}`);
    }

    useEffect(()=>{
      let path = routes.lastItem.route.path;
      let reg = RegExp("(?<=/admin/).*")
      let selected = "problem-manager"
      if(reg.test(path)){
        selected = reg.exec(path)[0]
      }
      setSelected(selected);
    }, [routes])

    return (
        <Layout style={{ height: '100%' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
            <Menu theme="dark" mode="inline" selectedKeys={[selected]} 
                  onSelect={({key})=>{onSelectedChange(key)}} items={items} />
          </Sider>
          <Layout className="site-layout">
            <Header style={{ padding: 0, }} />
            <Content style={{ margin: '0 16px', overflow: "auto", height: "100%" }}>
              <Outlet></Outlet>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
          </Layout>
        </Layout>
    );
}