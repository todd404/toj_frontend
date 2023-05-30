import { message, Skeleton } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { useParams } from "umi"

const getDiscribe = async (problem_id)=>{
    let url = `/api/problem`;
    let res = await axios.get(url, {params: {problem_id}});
    if(res.data.success){
        return res.data.content;
    }else{
        message.error("获取问题描述失败！");
    }
}

export default function Discribe(){
    const { id } = useParams();
    const [problemDiscribe, setProblemDiscribe] = useState();
    const [loading, setLoading] = useState(true);

    const updateDiscribe = async ()=>{
        setLoading(true);
        let data = await getDiscribe(id);
        setProblemDiscribe(data);
        setLoading(false);
    }

    useEffect(()=>{
        updateDiscribe();
    }, [problemDiscribe])

    return(
        <Skeleton
            {...loading}
            active={true}
        >
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {problemDiscribe}
            </ReactMarkdown>
        </Skeleton> 
    )
}