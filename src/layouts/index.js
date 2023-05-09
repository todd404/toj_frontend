import {  Outlet } from 'umi';
import './index.less';

import { Layout, Menu, } from 'antd';
import { BuildTwoTone } from '@ant-design/icons'
import UserBar from '../components/user/UserBar';
const { Header, Content, Footer } = Layout;
import { useSelectedRoutes } from "umi"
import Admin from './admin';

export default function Home() {
  const routes = useSelectedRoutes();

  if(routes[1].route.path.includes("admin")){
    return (<Admin></Admin>)
  }

  return (
    <Layout className="layout" style={{height: "100%"}}>
      <Header className='header' style={{display: "flex"}}>
        <BuildTwoTone style={{fontSize: "32px", margin: "16px 24px 16px 0"}} />
        <Menu
          theme='light'
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={[{key: 1, label: "题库"}]}
          style={{ flexGrow: "2" }}
        />
        <UserBar/>
      </Header>
      <Content style={{ padding: '3em 50px', overflow: "auto" }}>
        <Outlet></Outlet>
      </Content>
      <Footer style={{ textAlign: 'center' }}>TOJ ©2023 Created by Todd</Footer>
    </Layout>
  );
}
