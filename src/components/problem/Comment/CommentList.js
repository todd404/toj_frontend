import { LikeOutlined, MessageOutlined, StarOutlined, StarTwoTone, LikeTwoTone, MessageTwoTone, EditOutlined, EditTwoTone  } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import React from "react";
import SubCommnet from "./SubComment";
import { useState, useEffect } from 'react'
import axios from "axios";
import CommentInput from "./CommentInput";

const IconText = ({normalIcon, activeIcon, active, text, onClick, name, forComment})=>(
    <Space onClick={()=>{onClick(forComment, name)}} style={{cursor: "pointer"}}>
        {active ? activeIcon : normalIcon}
        {text}
    </Space>
)

const getComments = async (problem_id)=>{
    let res = await axios.get(`http://localhost:10393/mock/9e9ed3f6-20a8-4c4f-8fa7-6181902f7308/api/comments?apipost_id=afb4a7&problem=${problem_id}`)
    return res.data.data;
}

export default function CommentList(){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const actions = [
        {name: "like", normalIcon: <LikeOutlined/>, activeIcon: <LikeTwoTone />},
        {name: "sub_comment", normalIcon: <MessageOutlined/>, activeIcon: <MessageTwoTone />},
        {name: "reply", text: "回复", normalIcon: <EditOutlined/>, activeIcon: <EditTwoTone /> },
    ]

    const handleActionClicks = (commentId, action)=>{
        switch(action){
            case 'sub_comment':{
                let isActive, selector;
                let temp = data.map((value)=>{
                    if(value.id == commentId){
                        isActive = value.sub_comment_active;
                        selector = `#comment-${value.id}`
                        return {...value, sub_comment_active: !isActive}
                    }
                    
                    return value;
                })
                setData(temp);
                if(isActive){
                    document.querySelector(selector).scrollIntoView();
                }
                break;
            }
            case 'reply':{
                let temp = data.map((value=>(
                    value.id == commentId ? {...value, reply_active: !value.reply_active} : value
                )))
                setData(temp);
                break;
            }
                
        }
    }

    const updateComments = async (problem_id=123)=>{
        setLoading(true);
        let data = await getComments(problem_id);
        data = data.map((value)=>(
            { like_active: value.is_user_like, sub_comment_active: false, reply_active: false, ...value }
        ))
        setData(data);
        setLoading(false);
    }

    useEffect(() => {
        updateComments()
    }, []);

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                pageSize: 5
            }}
            loading={loading}
            dataSource={data}
            renderItem={(item)=>
            <div>
                <List.Item
                    id={`comment-${item.id}`}
                    key={ item.id }
                    actions={actions.map((action)=>{
                        return(
                            <IconText
                                forComment={item.id} 
                                text={item[action.name]} 
                                active={item[`${action.name}_active`]} 
                                onClick={handleActionClicks} 
                                {...action}
                            />
                        )
                    })}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={item.user_name} //TODO:改成用户链接
                    />

                    {item.content}
                </List.Item>
                {(item.reply_active && <CommentInput/>)}
                {(item.sub_comment_active && <SubCommnet onFoldCLick={ ()=>{handleActionClicks(item.id, "sub_comment")} }/>)}
            </div>
            }
        />
    )
}