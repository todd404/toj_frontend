import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { useSearchParams, } from 'umi'
import { useEffect, useState } from "react";

export default function ProblemComment(){
    const [querys] = useSearchParams();
    let commentId = querys.get("comment");
    let subCommentId = querys.get("subcomment");
    const [focus, setFocus] = useState({commentId, subCommentId});

    useEffect(()=>{
        let commentId = querys.get("comment");
        let subCommentId = querys.get("subcomment");

        setFocus({commentId, subCommentId});
    }, [querys])

    return(
        <div>
            <CommentInput/>
            <CommentList focus={focus}/>
        </div>
    )
}