import { List, Typography, Space } from "antd";

export default function MessageList({data}){
    return(
        <List
            size="small"
            pagination={{align: "center", size: "small", pageSize: 5}}
            dataSource={data}
            renderItem={(item)=>{
                return(
                    <List.Item>
                        <Space direction="vertical">
                            <a style={{ display: "inline-block", overflow: "hidden", maxWidth: "10em",  whiteSpace: "nowrap", textOverflow: "ellipsis" }}
                                href={
                                    parent_id == 0 ?
                                    `/problem/${item.problem_id}/comment?comment=${item.parent_id}&subcomment=${item.comment_id}`:
                                    `/problem/${item.problem_id}/comment?comment=${item.comment_id}`
                                }>
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