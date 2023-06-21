import { Button, Col, ConfigProvider, Divider, Form, Input, InputNumber, message, Row, Select, Space, Upload } from "antd";
import MarkdownEditor from "../components/admin/ProblemEdit/MarkdownEditor";
import "./css/ProblemEdit.css"
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";

const postAddProblemForm = async (data)=>{
    let url = `/api/add-problem`
    let res = await axios.post(url, data);

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
        let { title, upload_answer, upload_test, difficulty, time_limit, memory_limit } = values;
        if(!content){
            message.error("内容不能为空！");
            return;
        }

        if(!upload_answer || !upload_test){
            message.error("必须上传测试和答案文件！");
            return;
        }
        
        let formData = { title, content, difficulty, time_limit, memory_limit };
        
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
                initialValues={{
                    difficulty: 1
                }}
            >
                <Row style={{ padding: "12px 0 0 0" }}>
                    <Col span={10} offset={2} style={{alignSelf: "center"}}>
                        <Form.Item
                            name={"title"}
                            label="标题"
                            rules={[{
                                required: true,
                                message: "标题不能为空!"
                            }]}
                        >
                            <Input style={{ minWidth: "22em" }}/>
                        </Form.Item>
                    </Col>
                    <Col offset={1} span={4}>
                        <Form.Item
                            name="time_limit"
                            label="时间限制"
                            rules={[{
                                type: "number",
                                required: true,
                                min: 0,
                                message: "请输入正确的时间限制: 大于零的浮点数"
                            }]}
                        >
                            <InputNumber
                                controls={false}
                                addonAfter="ms"
                            />
                        </Form.Item>
                    </Col>
                    <Col offset={2} span={4}>
                        <Form.Item
                            name="memory_limit"
                            label="内存限制"
                            rules={[{
                                type: "integer",
                                required: true,
                                min: 0,
                                message: "请输入正确的内存限制: 大于零的整数"
                            }]}
                        >
                            <InputNumber
                                controls={false}
                                addonAfter="KB"
                            />
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

                    <Form.Item
                        label="难度"
                        name="difficulty"
                        rules={[{
                            required: true,
                            pattern: /^[1-5]$/
                        }]}
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