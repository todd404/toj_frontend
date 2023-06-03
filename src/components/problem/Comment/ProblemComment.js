import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { useSearchParams, } from 'umi'
import { useEffect, useState } from "react";
import axios from "axios";

const reportRead = (comment_id)=>{
    let url = `/api/comment-read`;

    axios.get(url, {params: {comment_id}})
}

export default function ProblemComment(){
    const [querys] = useSearchParams();
    let commentId = querys.get("comment");
    let subCommentId = querys.get("subcomment");
    const [focus, setFocus] = useState({commentId, subCommentId});

    useEffect(()=>{
        let commentId = querys.get("comment");
        let subCommentId = querys.get("subcomment");

        if(subCommentId){
            reportRead(subCommentId);
        }else if(commentId){
            reportRead(commentId);
        }

        setFocus({commentId, subCommentId});
    }, [querys])

    return(
        <div>
            <CommentInput/>
            <CommentList focus={focus}/>
        </div>
    )
}