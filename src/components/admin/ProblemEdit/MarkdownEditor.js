import CodeMirror from "@uiw/react-codemirror"
import { langs } from '@uiw/codemirror-extensions-langs';

export default function MarkdownEditor({id, value, onChange}){
    return(
        <CodeMirror
            {...{id, value, onChange}}
            maxHeight="100%"
            extensions={[langs["markdown"]()]}
        />  
    )
}