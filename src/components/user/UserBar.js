import { Avatar, Badge, List, Popover, Space } from "antd"
import { MailTwoTone, UserOutlined } from "@ant-design/icons"
import Login from "./Login"
import { useEffect, useState } from "react"
import axios from "axios"
import UserContent from "./UserContent"

async function getUserInfo(){
	let url = `http://localhost:10393/mock/9e9ed3f6-20a8-4c4f-8fa7-6181902f7308/api/userinfo`
	let res = await axios.get(url);
	return res.data;
}


export default function UserBar(){
    const [loginOpen, setLoginOpen] = useState(false);
	const [infoOpen, setInfoOpen] = useState(false);
	const [data, setData] = useState({success: false, 
									  userinfo:{
										"user_id": -1,
										"user_name": "",
										"is_admin": false,
										"avator": "",
										"message_count": 0}
									});

	const openLogin = ()=>setLoginOpen(true);

	const updateUserInfo = async ()=>{
		let data = await getUserInfo();
		setData(data);
	}

	useEffect(()=>{
		updateUserInfo();
	}, [])

    return(
        <div>
          <Space size={"middle"}>
            <Popover>
              <Badge count={data.userinfo.message_count} offset={[0, 6]}>
                  <MailTwoTone style={{ fontSize:"24px", position:"relative", top:"6px" }}/>
              </Badge>
            </Popover>

			<Popover
				open={infoOpen}
				trigger='hover'
				onOpenChange={(newOpen)=>{setInfoOpen(newOpen && data.success)}}
				content={(<UserContent avatar={data.userinfo.avator} username={data.userinfo.user_name}/>)}
			>
				<Avatar srcSet={data.userinfo.avator} onClick={data.success ? ()=>{} : openLogin} icon={<UserOutlined/>} style={{ cursor: "pointer" }}/>
			</Popover>
            <Login open={loginOpen} onOk={()=>setLoginOpen(false)} onCancel={()=>setLoginOpen(false)}/>
          </Space>
        </div>
    )
}