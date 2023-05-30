import { useEffect, useState } from "react";

import ProblemsetTable from "../components/problemset/ProblemsetTable";
import axios from "axios";

async function getProblemset(){
    let url = `/api/problemset`
    let res = await axios(url)
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
        <ProblemsetTable loading={loading} dataSource={data}></ProblemsetTable>
    )
}