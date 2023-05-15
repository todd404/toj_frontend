import { useEffect, useState } from "react";

import axios from "axios";
import UserManagerTable from "../components/admin/UserManager/UserManagerTable";

async function getUserList(){
    let res = await axios("http://localhost:10393/mock/9e9ed3f6-20a8-4c4f-8fa7-6181902f7308/api/userlist")
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