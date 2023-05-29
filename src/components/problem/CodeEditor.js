import CodeMirror from "@uiw/react-codemirror"
import { langs } from '@uiw/codemirror-extensions-langs';
import { Tabs, Select, Button } from "antd";
import { useEffect, useState } from "react";
import './css/CodeEditor.css'

//TODO:可以改成从后端获取可使用的语言
function LanguageSelect(props){
    
    const options = [
        {value: "cpp", label: "C++"},
        {value: "java", label: "Java"},
    ]

    return (
        <Select options={options} {...props}></Select>
    )
}

export default function CodeEditor({value, onChange, language, onLanguageChange, onSubmitClick}){
    const [extensions, setExtensions] = useState([]);

    useEffect(()=>{
        setExtensions([langs[language]()])
    }, [language])

    return(
        <div className="wrapper">
            <Tabs 
                tabBarExtraContent={(
                    <LanguageSelect
                        className="language-selector"
                        value={language}
                        onChange={onLanguageChange}
                    />
                )}
            />
            <CodeMirror
                {...{value, onChange, extensions}}
                height='100%'
                readOnly={false} />
            <Button className="submit-button" onClick={onSubmitClick}>提交</Button>
        </div>
    )
}