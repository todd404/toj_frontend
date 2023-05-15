import { List, Typography, Button, Space } from "antd";

export default function MessageList({data}){
    return(
        <List
            
            dataSource={data}
            renderItem={(item)=>{
                return(
                    <List.Item>
                        <Space direction="vertical">
                            <a style={{ width: "10em", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} href={`/problem/${item.problem_id}/comment?comment=${item.parent_id}&subcomment=${item.comment_id}`}>
                                {item.problem_title}
                            </a>

                            <Typography.Text style={{width: "10em"}} ellipsis={true}>
                                {item.comment_content}
                            </Typography.Text>
                        </Space>
                    </List.Item>
                )
            }}
        />
    )
}