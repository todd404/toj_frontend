import { Link, Outlet } from 'umi';
import './index.less';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {BuildTwoTone} from '@ant-design/icons'
const { Header, Content, Footer } = Layout;

export default function Home() {
  return (
    <Layout className="layout">
      <Header className='header' style={{display: "flex"}}>
        <BuildTwoTone style={{fontSize: "32px", margin: "16px 24px 16px 0"}} />
        <Menu
          theme='light'
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={[{key: 1, label: "题库"}]}
        />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Outlet></Outlet>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
}
