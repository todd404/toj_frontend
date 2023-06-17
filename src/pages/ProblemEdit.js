import { DownloadOutlined, LeftCircleTwoTone } from "@ant-design/icons";
import { Button, Col, ConfigProvider, Divider, Form, Input, message, Row, Space, Upload, Select } from "antd";
import MarkdownEditor from "../components/admin/ProblemEdit/MarkdownEditor";
import "./css/ProblemEdit.css"
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "umi";

const postEditForm = async (data)=>{
    let url = `/api/edit-problem`
    let res = await axios.post(url, data);

    if(res.data.success){
        message.success("编辑成功");
        setTimeout(()=>{
            history.back();
        }, 1000)
    }else{
        message.error("编辑失败");
    }
}

const getProblem = async (problem_id)=>{
    console.log(problem_id);
    let url = `/api/problem`;
    let res = await axios.get(url, {params:{problem_id}});
    if(res.data.success){
        return res.data;
    }else{
        message.error("获取问题描述失败！");
    }
}

export default function ProblemEditPage(){
    const [content, setContent] = useState();
    const { id } = useParams();
    const [form] = Form.useForm();

    const submitEdit = (values) => {
        if(!values.title || !content){
            message.error("标题和内容不能为空！");
            return;
        }

        let { title, upload_answer, upload_test, difficulty } = values;

        if(!(difficulty >= 1 && difficulty <= 5)){
            message.error("难度等级异常！");
            return;
        }
        
        let formData = {problem_id: id, title, content, difficulty};

        if(upload_answer){
            let answer_file = values.upload_answer.file;
            if(answer_file.status == "done"){
                formData["answer_file_uuid"] = answer_file.response.file_uuid;
            }
        }

        if(upload_test){
            let test_file = values.upload_test.file;
            if(test_file.status == "done"){
                formData["test_file_uuid"] = test_file.response.file_uuid;
            }
        }

        postEditForm(formData);
    }

    const initProblemContent = async()=>{
        let data = await getProblem(id);
        form.setFieldsValue({title: data.title, difficulty: data.difficulty})
        setContent(data.content);
    }

    useEffect(()=>{
        initProblemContent();
    }, [])
    
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
                initialValues={{
                    difficulty: 1
                }}
                form={form}
            >
                <Row style={{ padding: "12px 0 0 0" }}>
                    <Col span={1} style={{ alignSelf: "center", cursor:"pointer" }}>
                        <LeftCircleTwoTone style={{ fontSize: "24px" }} onClick={()=>{history.back()}}/>
                    </Col>
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
                            name={"upload_test"}
                        >
                            <Upload
                                action={`/api/upload`}
                                maxCount={1}
                            >
                                <Button icon={(<UploadOutlined/>)}>上传测试用例</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            name={"upload_answer"}
                        >
                            <Upload
                                action={`/api/upload`}
                                maxCount={1}
                            >
                                <Button icon={(<UploadOutlined/>)}>上传答案</Button>
                            </Upload>
                        </Form.Item>
                    </Space.Compact>

                    <Space.Compact>
                        <Button download={`/test/${id}.txt`} icon={(<DownloadOutlined/>)}>下载测试用例</Button>
                        <Button download={`/answer/${id}.txt`} icon={(<DownloadOutlined/>)}>下载答案</Button>
                    </Space.Compact>

                    <Form.Item
                        label="难度"
                        name="difficulty"
                    >
                        <Select
                            options={[
                                {
                                    value: 1,
                                    label: "Level 1"
                                },
                                {
                                    value: 2,
                                    label: "Level 2"
                                },
                                {
                                    value: 3,
                                    label: "Level 3"
                                },
                                {
                                    value: 4,
                                    label: "Level 4"
                                },
                                {
                                    value: 5,
                                    label: "Level 5"
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit">保存</Button>
                    </Form.Item>
                    
                </Space>

            </Form>
        </ConfigProvider>
    )
}