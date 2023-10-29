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

let tabSize = new Compartment

const getNewLs = (languageConfig, language)=>{
    let language_list = languageConfig.language_list
    let config = {}
    for(let v of language_list){
        if(v.id == language){
            config = v;
            break;
        }
    }

    var ls = languageServer({
        // WebSocket server uri and other client options.
        serverUri: `ws://localhost:3000/${config.id}`,
        rootUri: `${config.rootUri}/`,
    
        documentUri: `${config.rootUri}/Solution.${config.id}`,
        languageId: `${config.id}` // As defined at https://microsoft.github.io/language-server-protocol/specification#textDocumentItem.
    });

    return ls;
}

const getNewLanguageExtension = (l)=>{
    if(l){
        return langs[l]()
    }
    return langs["textile"]()
}

export default function CodeEditor({value, onChange, language, languageConfig, onLanguageChange, onSubmitClick}){
    const [extensions, setExtensions] = useState([]);
    const [languageOptions, setLanguageOptions] = useState([
        {value: "cpp", label: "C++"},
    ])

    useEffect(()=>{
        let options = languageConfig.language_list.map((v)=>{
            return {
                value: v.id,
                label: v.name
            }
        })

        setLanguageOptions(options)
    }, [languageConfig])

    useEffect(()=>{
        let ls = getNewLs(languageConfig, language)
        let lang = getNewLanguageExtension(language)

        setExtensions([
            lang,
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
                    <Select
                        options={languageOptions}
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