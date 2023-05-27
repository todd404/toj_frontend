import { useParams } from 'umi'
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemContent from '../components/problem/ProblemContent';
import ResizeHandle from '../components/problem/ResizeHandle';
import { useEffect, useState } from 'react';
import CodeEditor from '../components/problem/CodeEditor';
import { message } from 'antd';
import axios from 'axios';

const postJudge = async (formData)=>{
    let res = await axios.postForm(`${SERVER_BASE}/api/judge`, formData);
    return res.data.uuid;
}

export default function problem(){
    const { id } = useParams();
    const [language, setLanguage] = useState("cpp"); 
    const [code, setCode] = useState("");

    document.addEventListener('keydown', function(event) {
        // 检查按下的键是否是Ctrl键和字母S（ASCII码为83）
        if (event.ctrlKey && event.key === "s") {
          // 阻止默认行为
          event.preventDefault();
        }
    });

    const onSubmitClick = async ()=>{
        let formData = {problemId: id, code, language};
        let uuid = await postJudge(formData);
        console.log(uuid);
    }

    useEffect(()=>{
        let saved_code = localStorage[`${id}-${language}`];
        if(saved_code){
            setCode(saved_code);
            message.info("已从本地存储恢复代码");
        }else{
            setCode("");
        }
    }, [language])

    useEffect(()=>{
        localStorage[`${id}-${language}`] = code;
    }, [code])

    return(
        <div style={{height: "100%"}}>
            <PanelGroup autoSaveId="problem" direction="horizontal">
                <Panel defaultSize={ 20 }>
                    <ProblemContent></ProblemContent>
                </Panel>
                <ResizeHandle/>
                <Panel defaultSize={ 50 }>
                    <CodeEditor
                        {...{language, onSubmitClick}}
                        value={code}
                        onChange={(v)=>{setCode(v)}}
                        onLanguageChange={(value)=>setLanguage(value)}
                    />
                </Panel>
            </PanelGroup>
        </div>
        
    )
}