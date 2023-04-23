import CodeMirror from "@uiw/react-codemirror"
import { langs } from '@uiw/codemirror-extensions-langs';
import { Tabs, Dropdown } from "antd";

function LanguageDropdown(){
    return (
        <Dropdown></Dropdown>
    )
}

export default function CodeEditor(){
    return(
        <div>
            <Tabs tabBarExtraContent={(<LanguageDropdown />)}>
            </Tabs>
            <CodeMirror></CodeMirror>
        </div>
    )
}