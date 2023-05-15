import { Col, Row, Input, Modal, Space } from "antd";
import { Link } from "umi"

export default function Login({open, onOk, onCancel}){
    return(
        <Modal
            title="登录"
            centered
            width={332.8}
            {...{open, onOk, onCancel}}
        >
            <Row>
                <Col span={4}>
                    <span>账号：</span>
                </Col>
                <Col span={20}>
                    <Input style={{minWidth: "13em"}}/>
                </Col>
            </Row>
            <Row style={{ padding: "12px 0 12px 0" }}>
                <Col span={4}>
                    <span>密码：</span>
                </Col>
                <Col span={20}>
                    <Input style={{minWidth: "13em"}}/>
                </Col>
            </Row>
            <Link to="/register" reloadDocument>注册</Link>
        </Modal>
    )
}