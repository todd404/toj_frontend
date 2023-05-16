import {Button, Form, Input} from "antd";
import { useParams } from "umi"
import { useEffect } from "react";
import axios from "axios";

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

const getUserName = async (userid)=>{
    let res = await axios.get("http://192.168.1.100:10393/mock/9e9ed3f6-20a8-4c4f-8fa7-6181902f7308/api/username");
    return res.data.username
}

export default function UserEdit() {
    const [form] = Form.useForm();
    const { userid } = useParams();
    
    let username = ""

    async function formInit(){
        username = await getUserName(userid);
        form.setFieldsValue({username, userid});
    }

    useEffect(()=>{
        formInit();
    }, [])

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
                name="userid"
            >
                <Input disabled={true}/>
            </Form.Item>

            <Form.Item
                label="用户名"
                name="username"
                rules={[{
                        required: true,
                        message: '请输入用户名：4-16个字符（字母，数字，下划线，减号）',
                        pattern: /^[a-zA-Z0-9_-]{4,16}$/
                    }
                ]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
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