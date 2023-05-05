import { Avatar, Badge, Popover, Space } from "antd"
import { MailTwoTone, UserOutlined } from "@ant-design/icons"
import Login from "./Login"
import { useState } from "react"

export default function UserBar({messageCount, avatarUrl}){
    const [loginOpen, setLoginOpen] = useState(false);

    return(
        <div>
          <Space size={"middle"}>
            <Popover>
              <Badge count={5} offset={[0, 6]}>
                  <MailTwoTone style={{ fontSize:"24px", position:"relative", top:"6px" }}/>
              </Badge>
            </Popover>
            <Avatar icon={<UserOutlined/>} onClick={()=>setLoginOpen(true)}/>
            <Login open={loginOpen} onOk={()=>setLoginOpen(false)} onCancel={()=>setLoginOpen(false)}/>
          </Space>
        </div>
    )
}