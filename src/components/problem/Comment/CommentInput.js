import { Button, Divider, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "umi"

const { TextArea } = Input

const postComment = async (problem_id, parent_id, comment)=>{
    let url = `/api/submit_comment`
    let res = await axios.postForm(url, {problem_id, parent_id, comment});
    if(res.data.success){
        message.success("评论提交成功！");
        return res.data;
    }else{
        message.error("评论提交失败！");
        return res.data;
    }
}

export default function CommentInput({ parent_id = 0 }){
    const { id } = useParams();
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    
    const handleSubmitClick = async ()=>{
        if(comment){
            let result = await postComment(id, parent_id, comment);
            if(result.success){
                setComment("");

                let data = result.data
                if(data.parent_id == 0){
                    navigate(`/problem/${id}/comment?comment=${data.comment_id}`, {replace: true})
                }else{
                    navigate(`/problem/${id}/comment?comment=${data.parent_id}&subcomment=${data.comment_id}`, {replace: true})
                }
            }
        }
    }

    return(
        <div style={{ display:"flex", flexFlow:"column", paddingRight: "12px" }}>
            <TextArea 
                rows={3}
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
            />

            <Button 
                style={{ width: "5em", alignSelf: "flex-end", marginTop: "12px"}}
                onClick={handleSubmitClick}
            >
                提交
            </Button>

            <Divider />
        </div>
    )
}