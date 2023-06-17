import {Avatar, Button, Form, Input, message, Upload} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import md5 from "js-md5";

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
    let url = `/api/userinfo`
    let res = await axios.get(url);
    return res.data
}

const submitEdit = async (values)=>{
    let {user_name, avatar, old_password, new_password} = values;

    if(old_password && !new_password){
        message.error("请输入修改的新密码，如果不想修改请不要填写旧密码");
        return;
    }

    if(!old_password && new_password){
        message.error("修改密码请输入旧密码");
        return;
    }

    let data = {user_name};
    if(avatar){
        if(avatar.file.status == "done"){
            data["avatar_file_uuid"] = values.avatar.file.response.file_uuid;
        }
    }
    if(old_password && new_password){
        old_password = md5(old_password);
        new_password = md5(new_password);
        data = {...data, old_password, new_password}
    }

    let url = `/api/edit-userinfo`
    let res = await axios.post(url, data);
    if(!res.data.success){
        message.error(res.data.message);
    }else{
        message.info("修改成功！");
    }
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
            onFinish={submitEdit}
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
                    action={`/api/upload`}
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