import { LikeOutlined, MessageOutlined, StarOutlined, StarTwoTone, LikeTwoTone, MessageTwoTone, EditOutlined, EditTwoTone  } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import React, { useRef } from "react";
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

const actions = [
    {name: "like", normalIcon: <LikeOutlined/>, activeIcon: <LikeTwoTone />},
    {name: "sub_comment", normalIcon: <MessageOutlined/>, activeIcon: <MessageTwoTone />},
    {name: "reply", text: "回复", normalIcon: <EditOutlined/>, activeIcon: <EditTwoTone /> },
];

const pageSize = 5;

const getComments = async (problem_id)=>{
    let res = await axios.get(`http://localhost:10393/mock/9e9ed3f6-20a8-4c4f-8fa7-6181902f7308/api/comments?apipost_id=afb4a7&problem=${problem_id}`)
    return res.data.data;
}

function focusComment(commentId){
    let selector = `#comment-${commentId}`;

    let ele = document.querySelector(selector);
    if(ele){
        ele.scrollIntoView();
    }
}

function getCommentPageNum(commentId, data){
    let index = data.findIndex((value)=>value.id == commentId);
    return index != -1 ? Math.ceil((index + 1) / pageSize) : 1;
}

function actionsProcess( commentId, action, data ){
    let result_data = null, focus_id = null;
    switch(action){
        case 'sub_comment':{
            let isActive, id;
            let temp = data.map((value)=>{
                if(value.id == commentId){
                    isActive = value.sub_comment_active;
                    id = value.id
                    return {...value, sub_comment_active: !isActive}
                }
                
                return value;
            })
            result_data = temp;
            focus_id = id ? focusComment(id) : null;
            break;
        }
        case 'reply':{
            let temp = data.map((value=>(
                value.id == commentId ? {...value, reply_active: !value.reply_active} : value
            )))
            result_data = temp;
            break;
        }
            
    }

    return {result_data, focus_id};
}


//components
export default function CommentList({ focus }){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const firstLoad = useRef(true)
    const focused = useRef(false)

    const handleActionClicks = (commentId, action)=>{
        let {result_data, focus_id} = actionsProcess(commentId, action, data);

        setData(result_data);
        focusComment(focus_id);
    }

    const updateComments = async (problem_id=123)=>{
        setLoading(true);
        let data = await getComments(problem_id);
        data = data.map((value)=>{
            let sub_comment_active = value.id == focus.commentId ? true : false;
            let like_active = value.is_user_like;
            let reply_active = false;
            return { like_active, sub_comment_active, reply_active , ...value }
        })
        setData(data);
        console.log(data);
        setLoading(false);
    }

    useEffect(()=>{
        if(firstLoad.current){
            if(data.length > 0){
                let page = getCommentPageNum(focus.commentId, data);
                setCurrentPage(page);
                console.log(page);
                firstLoad.current = false;
            }
        }
    }, [data])

    useEffect(()=>{
        if(!focused.current){
            focusComment(focus.commentId);
            focused.current = true;
        }
    }, [currentPage])

    useEffect(() => {
        updateComments();
    }, [])

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                pageSize,
                current: currentPage,
                onChange: (page)=>{ setCurrentPage(page) },
            }}
            loading={loading}
            dataSource={data}
            renderItem={(item)=>
            <div>
                <List.Item
                    id={ `comment-${item.id}` }
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