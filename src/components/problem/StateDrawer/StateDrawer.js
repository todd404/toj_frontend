import { CheckCircleTwoTone, CloseCircleTwoTone, LoadingOutlined } from "@ant-design/icons";
import { Divider, Drawer, message, Typography } from "antd";
const { Paragraph } = Typography;
import axios from "axios";
import { useEffect, useState } from "react";

const getState = async (uuid)=>{
    let url = `/api/state`
    let res = await axios.get(url, {
        params: {uuid}
    })

    return res.data;
}

const StateIcon = function ({state, style}){
    if(state.includes("error")){
        return <CloseCircleTwoTone twoToneColor={"#CF000F"} {...{style}} />
    }else if(state.includes("success")){
        return <CheckCircleTwoTone twoToneColor={"#32CD32"} {...{style}}/>
    }else{
        return <LoadingOutlined {...{style}}/>
    }
}

export default function StateDrawer({uuid, open, onClose}){
    const [stateData, setStateData] = useState({state: "", message: ""});
    let intervalId;
    let isJudingMessageDestory = true;

    const refreshState = async ()=>{
        let stateData = await getState(uuid);
        setStateData(stateData);

        if(isJudingMessageDestory){
            return;
        }

        const state = stateData.state;
        if (state.includes("success")) {
            message.destroy("judging-message");
            clearInterval(intervalId);
            message.success("判题通过!");
        } else if (state.includes("error")) {
            message.destroy("judging-message");
            clearInterval(intervalId);
            message.error("判题失败!");
        }
    }

    useEffect(()=>{
        if(!uuid)   return;
        
        isJudingMessageDestory = false;
        message.loading({
            content: "判题中...",
            key: "judging-message",
            duration: 0,
            onClose: ()=>isJudingMessageDestory = true
        })
        refreshState();
        intervalId = setInterval(()=>{
            refreshState();
        }, 1000);
    }, [uuid])

    return(
        <Drawer
            {...{open}}
            onClose={()=>{clearInterval(intervalId); onClose();}}
            title="判题结果"
        >
            <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <StateIcon state={stateData.state} style={{ fontSize: "64px" }} />
                <Divider/>
                <Typography>
                    <Paragraph style={{ fontSize: "24px" }}>
                        {stateData.message}
                    </Paragraph>
                </Typography>
            </div>
            
        </Drawer>
    )
}