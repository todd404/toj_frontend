import { Input, Modal, Space } from "antd";


export default function Login({open, onOk, onCancel}){
    return(
        <Modal
            title="登录"
            centered
            width={332.8}
            {...{open, onOk, onCancel}}
        >
            <Space direction="vertical" align="center">
                <Space size={"middle"}>
                    <span>账号：</span>
                    <Input style={{minWidth: "11em"}}/>
                </Space>
                <Space size={"middle"}>
                    <span>密码：</span>
                    <Input style={{minWidth: "11em"}}/>
                </Space>
            </Space>
            
        </Modal>
    )
}