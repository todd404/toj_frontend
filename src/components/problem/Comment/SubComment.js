import { List, Avatar, ConfigProvider, Space, } from 'antd'
import { UpOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import axios from 'axios';

const getData = async (commnet_id)=>{
    let res = await axios.get(`http://localhost:10393/mock/9e9ed3f6-20a8-4c4f-8fa7-6181902f7308/api/sub_comment?apipost_id=d6046a`)
    return res.data.data;
}

export default function SubCommnet({commnetId, onFoldCLick}){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const updateData = async ()=>{
        setLoading(true);
        let data = await getData();
        setData(data);
        setLoading(false);
    }

    useEffect(()=>{
        updateData();
    },[])

    function FoldFooter (props){
        return(
            <Space onClick={onFoldCLick} style={{cursor: "pointer"}} {...props}>
                <UpOutlined />
                收起回复
            </Space>
        )
    }

    return(
        <ConfigProvider
            theme={{
                token:{
                    fontSize: "8px"
                }
            }}
        >
            <List
                itemLayout="horizontal"
                size="small"
                footer={<FoldFooter></FoldFooter>}
                pagination={{pageSize: 5, align: "center", size: "small"}}
                dataSource={data}
                renderItem={(item, index)=>(
                    <List.Item
                        key={item.id}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.user_avatar} />}
                            title={item.user_name} //TODO:改成用户链接
                            description={item.content}
                        />
                    </List.Item>
                )}
            />
        </ConfigProvider>
        
    )
}