import { useEffect, useState } from "react";

import axios from "axios";
import UserManagerTable from "../components/admin/UserManager/UserManagerTable";
import { message } from "antd";

async function getUserList(){
    let url = `/api/userlist`
    let res = await axios(url)
    return res.data.userlist;
}

const deleteUser = async (id)=>{
    let url = "/api/delete-user";
    let res = await axios.get(url, {params: {id}})
    return res;
}

export default function UserManager(){
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);

    async function refreshData(){
        setLoading(true);
        let data = await getUserList();
        setDataSource(data);
        setLoading(false);
    }

    const onUserDelete = async (id)=>{
        let res = await deleteUser(id);
        if(!res.data.success){
            message.error(res.data.message);
            return;
        }

        message.success("删除用户成功!");
        refreshData();
    }

    useEffect(()=>{
        refreshData();
    }, []);

    return(
        <UserManagerTable {...{loading, dataSource, onUserDelete}}/>
    )
}