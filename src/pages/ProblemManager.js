import { useEffect, useState } from "react";

import ProblemManagerTable from "../components/admin/ProblemManager/ProblemManagerTable";
import axios from "axios";
import { message } from "antd";

async function getProblemset(){
    let url = `/api/problemset`;
    let res = await axios(url);
    return res.data.problemset;
}

const deleteProblem = async (id)=>{
    let url = "/api/delete-problem";
    let res = await axios.get(url, {params: {id}})
    return res;
}

export default function ProblemsetPage(){
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);

    async function refreshData(){
        setLoading(true);
        let data = await getProblemset();
        setDataSource(data);
        setLoading(false);
    }

    const onProblemDelete = async (id)=>{
        let res = await deleteProblem(id);
        if(!res.data.success){
            message.error(res.data.message);
            return;
        }

        message.success("删除问题成功!");
        refreshData();
    }

    useEffect(()=>{
        refreshData();
    }, []);

    return(
        <ProblemManagerTable {...{loading, dataSource, onProblemDelete}}/>
    )
}