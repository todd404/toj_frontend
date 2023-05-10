import { LeftCircleTwoTone } from "@ant-design/icons";
import { Button, Col, Divider, Input, Row, Space } from "antd";
import MarkdownEditor from "../components/admin/ProblemEdit/MarkdownEditor";
import "./css/ProblemEdit.css"

export default function ProblemEditPage(){
    return(
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Row style={{ padding: "12px 0 0 0" }}>
                <Col span={1} style={{ alignSelf: "center", cursor:"pointer" }}>
                    <LeftCircleTwoTone style={{ fontSize: "24px" }} onClick={()=>{history.back()}}/>
                </Col>
                <Col span={9} offset={7}>
                    <Space style={{ alignSelf:"center"}}>
                        <span>标题：</span>
                        <Input style={{ minWidth: "22em" }}/>
                    </Space>
                </Col>
            </Row>
            

            <Divider/>
            <MarkdownEditor/>
            <Divider/>
            
            <Space  style={{ alignSelf: "center" }}>
                <Space.Compact>
                    <Button>下载测试用例</Button>
                    <Button>下载答案</Button>
                    <Button>上传测试用例</Button>
                    <Button>上传答案</Button>
                </Space.Compact>
                <Button>保存</Button>
            </Space>
            
        </div>
    )
}