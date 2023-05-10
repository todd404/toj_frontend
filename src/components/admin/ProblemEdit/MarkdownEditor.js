import CodeMirror from "@uiw/react-codemirror"
import { langs } from '@uiw/codemirror-extensions-langs';

export default function MarkdownEditor(){
    return(
        <CodeMirror
            maxHeight="100%"
            extensions={[langs["markdown"]()]}
        />  
    )
}