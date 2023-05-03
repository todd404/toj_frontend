import { List, Avatar, ConfigProvider, Space, } from 'antd'
import { UpOutlined } from '@ant-design/icons'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as CommentUtils from "./CommentUtils"

const getData = async (commnet_id)=>{
    let res = await axios.get(`http://localhost:10393/mock/9e9ed3f6-20a8-4c4f-8fa7-6181902f7308/api/sub_comment?apipost_id=d6046a`)
    return res.data.data;
}

export default function SubCommnet({commnetId, onFoldCLick, focus}){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const firstLoad = useRef(true)
    const focused = useRef(false)

    const updateData = async ()=>{
        setLoading(true);
        let data = await getData();
        setData(data);
        setLoading(false);
    }

    useEffect(()=>{
        if(firstLoad.current){
            if(data.length > 0){
                let page = CommentUtils.getCommentPageNum(focus.subCommentId, data);
                setCurrentPage(page);
                firstLoad.current = false;
            }
        }
    }, [data])

    useEffect(()=>{
        if(!focused.current && !firstLoad.current){
            CommentUtils.focusComment(focus.subCommentId);
            focused.current = true;
        }
    }, [currentPage])

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
                pagination={{pageSize: CommentUtils.pageSize, align: "center", size: "small", current: currentPage}}
                dataSource={data}
                loading={loading}
                renderItem={(item, index)=>(
                    <List.Item
                        key={item.id}
                        id={ `comment-${item.id}` }
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