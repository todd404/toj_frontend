import { useEffect, useState } from "react";

import ProblemsetTable from "../components/ProblemsetTable";
import axios from "axios";

async function getProblemset(){
    let res = await axios("http://192.168.1.100:10393/mock/9e9ed3f6-20a8-4c4f-8fa7-6181902f7308/api/problemset?apipost_id=1f490c")
    return res.data.problemset;
}

export default function ProblemsetPage(){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    async function getData(){
        let data = await getProblemset();
        setData(data);
        console.log(data)
        setLoading(false);
    }

    useEffect(()=>{
        getData();
    }, []);

    return(
        <ProblemsetTable loading={loading} dataSource={data}></ProblemsetTable>
    )
}