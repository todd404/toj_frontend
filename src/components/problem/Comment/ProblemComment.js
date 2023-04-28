import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { useSearchParams, } from 'umi'
import { useEffect } from "react";


export default function ProblemComment(){
    const [querys] = useSearchParams();
    let commentId = querys.get("comment");
    let subCommentId = querys.get("subcomment");

    return(
        <div>
            <CommentInput/>
            <CommentList focus={{commentId, subCommentId}}/>
        </div>
    )
}