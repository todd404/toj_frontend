import { useParams } from 'umi'
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemContent from '../components/problem/ProblemContent';
import ResizeHandle from '../components/problem/ResizeHandle';
import { useEffect, useState } from 'react';
import CodeEditor from '../components/problem/CodeEditor';
import { message } from 'antd';
import axios from 'axios';
import StateDrawer from '../components/problem/StateDrawer/StateDrawer';

const postJudge = async (formData)=>{
    let url = `/api/judge`
    let res = await axios.postForm(url, formData);
    return res.data.uuid;
}

export default function problem(){
    const { id } = useParams();
    const [language, setLanguage] = useState("cpp"); 
    const [code, setCode] = useState("");
    const [uuid, setUuid] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);

    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === "s") {
          event.preventDefault();
        }
    });

    const onSubmitClick = async ()=>{
        let formData = {problemId: id, code, language};
        let uuid = await postJudge(formData);
        setUuid(uuid);
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
        //代码改变时自动保存到本地存储里
        localStorage[`${id}-${language}`] = code;
    }, [code])

    useEffect(()=>{
        if(uuid){
            setDrawerOpen(true);
        }
    }, [uuid])

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

            <StateDrawer 
                uuid={uuid} 
                open={drawerOpen} 
                onClose={()=>{setDrawerOpen(false)}} 
            />
        </div>
        
    )
}