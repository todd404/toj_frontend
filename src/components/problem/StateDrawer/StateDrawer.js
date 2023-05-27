import { CheckCircleTwoTone, CloseCircleTwoTone, LoadingOutlined } from "@ant-design/icons";
import { Divider, Drawer, Typography } from "antd";
const { Paragraph } = Typography;
import axios from "axios";
import { useEffect, useState } from "react";

const getState = async (uuid)=>{
    let res = await axios.get(`${SERVER_BASE}/api/state`, {
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

    const refreshState = async ()=>{
        let stateData = await getState(uuid);
        setStateData(stateData);
        if(stateData.state.includes("success") || stateData.state.includes("error")){
            clearInterval(intervalId);
        }
    }

    useEffect(()=>{
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
            maskClosable={false}
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