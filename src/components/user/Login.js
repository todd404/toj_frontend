import { Input, Modal, Form, message } from "antd";
import axios from "axios";
import md5 from "js-md5";
import { Link } from "umi"

const formItemLayout = {
    labelCol: {
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      sm: {
        span: 18,
      },
    },
};

const postLoginForm = async ({username, password})=>{
    password = md5(password);

    let url = `${SERVER_BASE}/api/login`
    let res = await axios.postForm(url, {username, password});

    if(!res.data.success){
        message.error(res.data.message);
        return false;
    }else{
        message.success("登录成功！");
        return true;
    }
}

export default function Login({open, onOk, onCancel}){
    const [form] = Form.useForm();
    
    const handleOk = ()=>{
        form.submit()
    }

    const formSubmit = async (values)=>{
        message.loading({
            content: "登陆中...",
            duration: 0,
            key: "login-message"
        })

        let result = await postLoginForm(values);
        message.destroy("login-message");
        
        if(result){
            onOk();
        }else{
            return;
        }
    }

    return(
        <Modal
            title="登录"
            centered
            width={332.8}
            onOk={handleOk}
            {...{open, onCancel}}
        >
            <Form
                {...formItemLayout}
                form={form}
                onFinish={formSubmit}
            >
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
            </Form>
            <Link to="/register" reloadDocument>注册</Link>
        </Modal>
    )
}