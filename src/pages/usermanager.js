import { useEffect, useState } from "react";

import axios from "axios";
import UserManagerTable from "../components/admin/UserManager/UserManagerTable";

async function getUserList(){
    let url = `${SERVER_BASE}/api/userlist`
    let res = await axios(url)
    return res.data.userlist;
}

export default function UserManager(){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    async function getData(){
        setLoading(true);
        let data = await getUserList();
        setData(data);
        setLoading(false);
    }

    useEffect(()=>{
        getData();
    }, []);

    return(
        <UserManagerTable loading={loading} dataSource={data}/>
    )
}