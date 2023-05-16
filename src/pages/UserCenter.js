import {Avatar, Button, Form, Input, Upload} from "antd";
import { useParams } from "umi"
import { useEffect, useState } from "react";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
  };

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
        span: 24,
        offset: 0,
        },
        sm: {
        span: 16,
        offset: 8,
        },
    },
};

const getUserInfo = async ()=>{
    let res = await axios.get("http://192.168.1.100:10393/mock/9e9ed3f6-20a8-4c4f-8fa7-6181902f7308/api/userinfo");
    return res.data
}

export default function UserCenter() {
    const [form] = Form.useForm();
    const [userInfo, setUserInfo] = useState({
		success: false, 
		userinfo:{
		"user_id": -1,
		"user_name": "",
		"is_admin": false,
		"avatar": "",
		"message_count": 0}
	});

    async function formInit(){
        let data = await getUserInfo();
        setUserInfo(data);
    }

    useEffect(()=>{
        formInit();
    }, []);

    useEffect(()=>{
        let {user_id, user_name} = userInfo.userinfo
        form.setFieldsValue({user_id, user_name});
    }, [userInfo])

    return (
        <Form
            style={{ padding: "12px 0 0 0" }}
            form={form}
            {...formItemLayout}
            name="edituser"
            onFinish={(values) => {
                console.log(values)
            }}
            autoComplete="off">

            <Form.Item
                label="用户id"
                name="user_id"
            >
                <Input disabled={true}/>
            </Form.Item>

            <Form.Item
                label="当前头像"
            >
                <Avatar src={userInfo.userinfo.avatar}/>
            </Form.Item>

            <Form.Item
                label="上传头像"
                name="avatar"
            >
                <Upload
                    action={`http://localhost:5000/upload`}
                    onChange={(info)=>{console.log(info)}}
                    maxCount={1}
                >
                    <Button icon={(<UploadOutlined/>)}>点击上传头像</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                label="用户名"
                name="user_name"
                rules={[{
                        required: true,
                        message: '请输入用户名：4-16个字符（字母，数字，下划线，减号）',
                        pattern: /^[a-zA-Z0-9_-]{4,16}$/
                    }
                ]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="重置密码（老密码）:"
                name="old_password"
                rules={[{
                        message: '请输入正确的密码(至少8位)',
                        min: 8,
                        max: 20
                    }
                ]}>
                <Input.Password/>
            </Form.Item>

            <Form.Item
                label="重置密码（新密码）:"
                name="new_password"
                rules={[{
                        message: '请输入正确的密码(至少8位)',
                        min: 8,
                        max: 20
                    }
                ]}>
                <Input.Password/>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}