import { Avatar, Badge, message, Popover, Space } from "antd"
import { MailTwoTone, UserOutlined } from "@ant-design/icons"
import Login from "./Login"
import { useEffect, useState } from "react"
import axios from "axios"
import UserContent from "./UserContent"
import MessageList from "./MessageList"
import {useNavigate} from "umi"

async function getUserInfo(){
	let url = `${SERVER_BASE}/api/userinfo`
	let res = await axios.get(url, {withCredentials: true});
	return res.data;
}

async function getMessages(){
	let url = `${SERVER_BASE}/api/messages`
	let res = await axios.get(url, {withCredentials: true});
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
	const openUserCenter = ()=>navigate("/usercenter");
	const openAdmin = ()=>navigate("/admin");

	const handleAvatarClick = ()=>{
		if(userInfo.success){
			if(userInfo.userinfo.is_admin){
				openAdmin();
			}else{
				openUserCenter();
			}
		}else{
			openLogin();
		}
	}

	const handleLoginOk = ()=>{
		updateUserInfo();
		updateMessages();
		setLoginOpen(false);
	}

	const updateUserInfo = async ()=>{
		let userInfo = await getUserInfo();
		console.log(userInfo);
		if(!userInfo.success){
			setUserInfo({
				success: false, 
				userinfo:{
				"user_id": -1,
				"user_name": "",
				"is_admin": false,
				"avatar": "",
				"message_count": 0}
			});
			return;
		}
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
				<Avatar src={userInfo.userinfo.avatar} onClick={handleAvatarClick} icon={<UserOutlined/>} style={{ cursor: "pointer" }}/>
			</Popover>
            <Login open={loginOpen} onOk={handleLoginOk} onCancel={()=>setLoginOpen(false)}/>
          </Space>
        </div>
    )
}