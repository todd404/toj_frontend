import {Button, Form, Input, message} from "antd";
import axios from "axios";
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

const autoLogin = async (formData)=>{
    let url = `/api/login`
    await axios.postForm(url, formData);
    window.location = "/";
}

const postRegisterForm = async (formData)=>{
    let url = `/api/register`
    let res = await axios.postForm(url, formData);
    let data = res.data;
    if(!data.succuss){
        message.error("注册失败！");
    }else{
        message.success("注册成功！一秒后自动登录！");
        setTimeout(()=>{
            autoLogin();
        }, 1000)
    }
}

export default function register() {
    const registerAccount = async (values)=>{
        let {username, password} = values;
        let formData = {username};

        password = md5(password);
        formData = {...formData, password};
        postRegisterForm(formData);
    }

    return (
        <Form
            {...formItemLayout}
            name="register"
            onFinish={registerAccount}
            autoComplete="off">
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
                        required: true,
                        message: '请输入正确的密码(至少8位)',
                        min: 8,
                        max: 20
                    }
                ]}>
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="confirm"
                label="确认密码"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: '请确认密码',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}