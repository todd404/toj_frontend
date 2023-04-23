import CodeMirror from "@uiw/react-codemirror"
import { langs } from '@uiw/codemirror-extensions-langs';
import { Tabs, Select, Button } from "antd";
import { useState } from "react";
import './CodeEditor.css'

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

export default function CodeEditor(){
    const [extenstions, setExtensions] = useState([]);
    const [language, setLanguage] = useState("cpp");
    
    const handleLanguageChange = (value)=>{
        setLanguage(value);
    }

    return(
        <div className="wrapper">
            <Tabs 
                tabBarExtraContent={(<LanguageSelect className="language-selector" defaultValue={language} onChange={handleLanguageChange}/>)}
            />
            <CodeMirror 
                height='100%'
                extensions={[langs["cpp"]()]} 
                readOnly={false} />
            <Button className="submit-button">提交</Button>
        </div>
    )
}