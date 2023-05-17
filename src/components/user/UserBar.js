import { Avatar, Badge, Popover, Space } from "antd"
import { MailTwoTone, UserOutlined } from "@ant-design/icons"
import Login from "./Login"
import { useEffect, useState } from "react"
import axios from "axios"
import UserContent from "./UserContent"
import MessageList from "./MessageList"
import {useNavigate} from "umi"

async function getUserInfo(){
	let url = `http://localhost:10393/mock/9e9ed3f6-20a8-4c4f-8fa7-6181902f7308/api/userinfo`
	let res = await axios.get(url);
	return res.data;
}

async function getMessages(){
	let url = `http://localhost:10393/mock/9e9ed3f6-20a8-4c4f-8fa7-6181902f7308/api/messages`
	let res = await axios.get(url);
	return res.data;
}

export default function UserBar(){
	const navigate = useNavigate();

    const [loginOpen, setLoginOpen] = useState(false);
	const [infoOpen, setInfoOpen] = useState(false);
	const [userInfo, setUserInfo] = useState({
		success: false, 
		userinfo:{
		"user_id": -1,
		"user_name": "",
		"is_admin": false,
		"avatar": "",
		"message_count": 0}
	});

	const [messages, setMessages] = useState({
		success: false,
		messages: []
	})

	const openLogin = ()=>setLoginOpen(true);
	const openUserCenter = ()=>navigate("/usercenter")

	const updateUserInfo = async ()=>{
		let userInfo = await getUserInfo();
		setUserInfo(userInfo);
	}

	const updateMessages = async ()=>{
		let messages = await getMessages();
		setMessages(messages);
	}

	useEffect(()=>{
		updateUserInfo();
		updateMessages();
	}, [])

    return(
        <div>
          <Space size={"middle"}>
            <Popover
				content={(<MessageList data={messages.messages}/>)}
			>
              <Badge count={messages.messages.length} offset={[0, 6]}>
                  <MailTwoTone style={{ fontSize:"24px", position:"relative", top:"6px" }}/>
              </Badge>
            </Popover>

			<Popover
				open={infoOpen}
				trigger='hover'
				onOpenChange={(newOpen)=>{setInfoOpen(newOpen && userInfo.success)}}
				content={(<UserContent username={userInfo.userinfo.user_name}/>)}
			>
				<Avatar src={userInfo.userinfo.avatar} onClick={userInfo.success ? openUserCenter : openLogin} icon={<UserOutlined/>} style={{ cursor: "pointer" }}/>
			</Popover>
            <Login open={loginOpen} onOk={()=>setLoginOpen(false)} onCancel={()=>setLoginOpen(false)}/>
          </Space>
        </div>
    )
}