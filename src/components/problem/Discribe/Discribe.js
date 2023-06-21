import { message, Skeleton } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {okaidia} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useParams } from "umi"
import "./markdown.css"

const getDiscribe = async (problem_id)=>{
    let url = `/api/problem`;
    let res = await axios.get(url, {params:{problem_id}});
    if(res.data.success){
        return res.data.content;
    }else{
        message.error(res.data.message);
    }
}

export default function Discribe(){
    const { id } = useParams();
    const [problemDiscribe, setProblemDiscribe] = useState("");
    const [loading, setLoading] = useState(true);

    const updateDiscribe = async ()=>{
        setLoading(true);
        let data = await getDiscribe(id);
        setProblemDiscribe(data);
        setLoading(false);
    }

    useEffect(()=>{
        updateDiscribe();
    }, [])

    return(
        <Skeleton
            loading={loading}
            active={true}
        >
            <ReactMarkdown
                children={problemDiscribe}
                className="markdown"
                components={{
                    code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                {...props}
                                children={String(children).replace(/\n$/, '')}
                                style={okaidia}
                                language={match[1]}
                                PreTag="div"
                            />
                        ) : (
                            <code {...props} className={className}>
                                {children}
                            </code>
                        )
                    }
                }}
            />
        </Skeleton> 
    )
}