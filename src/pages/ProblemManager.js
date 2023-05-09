import { useEffect, useState } from "react";

import ProblemManagerTable from "../components/admin/ProblemManager/ProblemManagerTable";
import axios from "axios";

async function getProblemset(){
    let res = await axios("http://localhost:10393/mock/9e9ed3f6-20a8-4c4f-8fa7-6181902f7308/api/problemset?apipost_id=1f490c")
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