import { LikeOutlined, MessageOutlined, LikeTwoTone, MessageTwoTone, EditOutlined, EditTwoTone  } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import React, { useRef } from "react";
import SubCommnet from "./SubComment";
import { useState, useEffect } from 'react'
import axios from "axios";
import CommentInput from "./CommentInput";
import * as CommentUtils from "./CommentUtils"
import { useParams } from "umi"


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

const getComments = async (problem_id)=>{
    let url = `/api/comments`
    let res = await axios.get(url, {params: {problem_id}})
    return res.data.data;
}

export default function CommentList({ focus }){
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const lastFocus = useRef({});
    const changeLastFocusFlag = useRef(false);

    const handleActionClicks = async (commentId, action)=>{
        let {result_data, focus_id} = await CommentUtils.actionsProcess(commentId, action, data);

        setData(result_data);
        CommentUtils.focusComment(focus_id);
    }

    const updateComments = async ()=>{
        setLoading(true);
        let data = await getComments(id);
        data = data.map((value)=>{
            //首次加载展开需要跳转的评论的子评论
            let sub_comment_active = ( (value.id == focus.commentId) && focus.subCommentId );
            let like_active = value.is_user_like;
            let reply_active = false;
            return { like_active, sub_comment_active, reply_active, ...value }
        })
        setData(data);
        setLoading(false);
    }

    useEffect(()=>{
        if(JSON.stringify(lastFocus.current) != JSON.stringify(focus)){
            if(data.length > 0){
                let page = CommentUtils.getCommentPageNum(focus.commentId, data);
                changeLastFocusFlag.current = true;
                setCurrentPage(page);
            }
        }
    }, [data])

    useEffect(()=>{
        if(
            (JSON.stringify(lastFocus.current) != JSON.stringify(focus))
            && changeLastFocusFlag.current
        ){
            CommentUtils.focusComment(focus.commentId);
            lastFocus.current = focus;
        }
    }, [currentPage])

    useEffect(()=>{
        updateComments();
    }, [focus])

    useEffect(() => {
        updateComments();
    }, [])

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                pageSize: CommentUtils.pageSize,
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
                    {(item.reply_active && <CommentInput parent_id={item.id}/>)}
                    {(item.sub_comment_active && <SubCommnet focus={focus} parentId={item.id} onFoldCLick={ ()=>{handleActionClicks(item.id, "sub_comment")} }/>)}
                </div>
            }
        />
    )
}