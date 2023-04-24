import { useParams } from 'umi'
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemContent from '../components/problem/ProblemContent';
import ResizeHandle from '../components/problem/ResizeHandle';
import { langs } from '@uiw/codemirror-extensions-langs';
import { useState } from 'react';
import CodeEditor from '../components/problem/CodeEditor';

export default function problem(){
    const { id } = useParams();
    const [language, setLanguage] = useState(langs["cpp"]()); 
    return(
        <div style={{height: "100%"}}>
            <PanelGroup autoSaveId="problem" direction="horizontal">
                <Panel defaultSize={ 20 }>
                    <ProblemContent></ProblemContent>
                </Panel>
                <ResizeHandle/>
                <Panel defaultSize={ 50 }>
                    <CodeEditor></CodeEditor>
                </Panel>
            </PanelGroup>
        </div>
        
    )
}