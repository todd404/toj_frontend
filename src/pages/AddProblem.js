import { Button, Divider, Input, Space } from "antd";
import MarkdownEditor from "../components/admin/ProblemEdit/MarkdownEditor";
import "./css/ProblemEdit.css"

export default function AddProblem(){
    return(
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Space style={{ alignSelf:"center", padding: "12px 0 0 0" }}>
                <span>标题：</span>
                <Input style={{ minWidth: "22em" }}/>
            </Space>

            <Divider/>
            <MarkdownEditor/>
            <Divider/>
            
            <Space  style={{ alignSelf: "center" }}>
                <Space.Compact>
                    <Button>上传测试用例</Button>
                    <Button>上传答案</Button>
                </Space.Compact>
                <Button>保存</Button>
            </Space>
            
        </div>
    )
}