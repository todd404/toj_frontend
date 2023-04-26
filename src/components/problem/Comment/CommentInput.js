import { Button, Divider, Input } from "antd";

const { TextArea } = Input

export default function CommentInput(){
    return(
        <div style={{ display:"flex", flexFlow:"column", paddingRight: "12px" }}>
            <TextArea rows={3}/>
            <Button style={{ width: "5em", alignSelf: "flex-end", marginTop: "12px"}}>提交</Button>
            <Divider />
        </div>
    )
}