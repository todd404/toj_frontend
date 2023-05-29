import { Button, Col, ConfigProvider, Divider, Form, Input, message, Row, Space, Upload } from "antd";
import MarkdownEditor from "../components/admin/ProblemEdit/MarkdownEditor";
import "./css/ProblemEdit.css"
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";

const postAddProblemForm = async (formData)=>{
    let res = await axios.postForm(`${SERVER_SOCKET}/api/add-problem`, formData);

    if(res.data.success){
        message.success("添加成功");
        setTimeout(()=>{
            history.back();
        }, 1000)
    }else{
        message.error("添加失败");
    }
}

export default function ProblemEditPage(){
    const [content, setContent] = useState();

    const submitEdit = (values) => {
        let { title, upload_answer, upload_test } = values;
        if(!title || !content){
            message.error("标题和内容不能为空！");
            return;
        }

        if(!upload_answer || !upload_test){
            message.error("必须上传测试和答案文件！");
            return;
        }
        
        let formData = { title, content };
        
        let answer_file = upload_answer.file;
        let test_file = upload_test.file;

        formData["answer_file_uuid"] = answer_file.response.file_uuid;
        formData["test_file_uuid"] = test_file.response.file_uuid;

        postAddProblemForm(formData);
    }
    
    return(
        <ConfigProvider
            theme={{
                components:{
                    Form:{
                        marginLG: "0px"
                    }
                }
            }}
        >
            <Form
                style={{ height: "100%", display: "flex", flexDirection: "column" }}
                onFinish={submitEdit}
            >
                <Row style={{ padding: "12px 0 0 0" }}>
                    <Col span={10} offset={7} style={{alignSelf: "center"}}>
                        <Form.Item
                            name={"title"}
                            label="标题"
                        >
                            <Input style={{ minWidth: "22em" }}/>
                        </Form.Item>
                    </Col>
                </Row>
                
                <Divider/>
                
                <MarkdownEditor value={content} onChange={(v)=>{setContent(v)}} />

                <Divider/>
                
                <Space  style={{ alignSelf: "center", overflow: "auto"}}>
                    <Space.Compact>
                        <Form.Item
                            name={"upload_answer"}
                        >
                            <Upload
                                action={`${SERVER_BASE}/api/upload`}
                                maxCount={1}
                            >
                                <Button icon={(<UploadOutlined/>)}>上传答案</Button>
                            </Upload>
                        </Form.Item>
                        

                        <Form.Item
                            name={"upload_test"}
                        >
                            <Upload
                                action={`${SERVER_BASE}/api/upload`}
                                maxCount={1}
                            >
                                <Button icon={(<UploadOutlined/>)}>上传测试用例</Button>
                            </Upload>
                        </Form.Item>
                    </Space.Compact>

                    <Form.Item>
                        <Button htmlType="submit">保存</Button>
                    </Form.Item>
                </Space>

            </Form>
        </ConfigProvider>
    )
}