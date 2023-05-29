import { useEffect, useState } from "react";

import ProblemManagerTable from "../components/admin/ProblemManager/ProblemManagerTable";
import axios from "axios";

async function getProblemset(){
    let url = `${SERVER_BASE}/api/problemset`;
    let res = await axios(url);
    return res.data.problemset;
}

export default function ProblemsetPage(){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    async function getData(){
        setLoading(true);
        let data = await getProblemset();
        setData(data);
        setLoading(false);
    }

    useEffect(()=>{
        getData();
    }, []);

    return(
        <ProblemManagerTable loading={loading} dataSource={data}/>
    )
}