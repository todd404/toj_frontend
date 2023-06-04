import { useState, useEffect } from 'react';
import {
  DesktopOutlined,
  PlusCircleOutlined,
  UserOutlined,
  ConsoleSqlOutlined
} from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import { Outlet, useSelectedRoutes, useNavigate } from "umi"
import axios from 'axios';

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

function getColorByTime() {
  // 获取当前时间的小时、分钟和秒数
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  // 将h、m和s转换为0到255之间的整数
  let r = h * 10 + 5;
  let g = m * 4 + 3;
  let b = s * 4 + 3;

  // 如果转换后的值超过255，就取余数
  r = r % 256;
  g = g % 256;
  b = b % 256;

  // 将r、g和b转换为十六进制字符串，并拼接起来，加上一个#号作为前缀
  let hexR = r.toString(16);
  let hexG = g.toString(16);
  let hexB = b.toString(16);

  // 如果转换后的字符串长度不足2位，就在前面补0
  if (hexR.length < 2) hexR = "0" + hexR;
  if (hexG.length < 2) hexG = "0" + hexG;
  if (hexB.length < 2) hexB = "0" + hexB;

  // 返回十六进制颜色值
  return "#" + hexR + hexG + hexB;
}


export default function Admin(){
    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState("problem-manager");

    const routes = useSelectedRoutes();
    const navigate = useNavigate();

    const onSelectedChange = (key)=>{
      navigate(`/admin/${key}`);
    }

    const verifyAdmin = async ()=>{
      let url = `/api/userinfo`;
      let res = await axios.get(url);
      if(!res.data.success || !res.data.userinfo.is_admin){
        location = "/";
      }
    }

    verifyAdmin();

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
            <div style={{ display: "flex", alignContent: "center", overflowX: "clip" , gap: "8px", height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }}>
              <ConsoleSqlOutlined style={{  paddingLeft: "8px", fontSize:"32px",color: getColorByTime()}}/>
              <Typography.Text style={{ alignSelf: "center", color: getColorByTime(), fontSize: "1.5em", fontWeight: "bolder"}}>.- -.. -- .. -.</Typography.Text>
            </div>
            <Menu theme="dark" mode="inline" selectedKeys={[selected]} 
                  onSelect={({key})=>{onSelectedChange(key)}} items={items} />
          </Sider>
          <Layout className="site-layout">
            <Header style={{ padding: 0, }} />
            <Content style={{ margin: '0 16px', overflow: "auto", height: "100%" }}>
              <Outlet></Outlet>
            </Content>
            <Footer style={{ textAlign: 'center' }}>TOJ ©2023 Created by Todd</Footer>
          </Layout>
        </Layout>
    );
}