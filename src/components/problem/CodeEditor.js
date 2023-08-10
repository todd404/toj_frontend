import CodeMirror from "@uiw/react-codemirror"
import { langs } from '@uiw/codemirror-extensions-langs';
import { Tabs, Select, Button } from "antd";
import { useEffect, useState } from "react";
import {keymap} from "@codemirror/view"
import {insertTab} from "@codemirror/commands"
import {EditorState, Compartment} from "@codemirror/state"
import {acceptCompletion} from "@codemirror/autocomplete"
import {indentUnit} from '@codemirror/language'
import './css/CodeEditor.css'

import { languageServer } from 'codemirror-languageserver';
import { v4 as uuidv4 } from "uuid"

let uuid = uuidv4();
let tabSize = new Compartment

var ls = languageServer({
	// WebSocket server uri and other client options.
	serverUri: "ws://localhost:3000/cpp",
	rootUri: `file://~/lgs/ccls/save_files/${uuid}`,

	documentUri: `file://~/lgs/ccls/save_files/${uuid}/main.cpp`,
	languageId: 'cpp' // As defined at https://microsoft.github.io/language-server-protocol/specification#textDocumentItem.
});

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
        setExtensions([
            langs[language](),
            ls,
            tabSize.of(EditorState.tabSize.of(4)),
            keymap.of([
                {key: "Tab", run: acceptCompletion, preventDefault: true},
                {key: "Tab", run: insertTab, preventDefault: true}
            ]),
            indentUnit.of("\t")
        ])
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
                readOnly={false}
                indentWithTab={false} />
            <Button className="submit-button" onClick={onSubmitClick}>提交</Button>
        </div>
    )
}