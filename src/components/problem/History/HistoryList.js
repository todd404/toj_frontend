import { Table, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "umi"

const columns = [
    {
        title: "提交结果",
        dataIndex: 'status',
        render: (stat)=>{
            let type = stat == "通过" ? "success" : "warning";
            return(
                <Typography.Text type={type}>{stat}</Typography.Text>
            )
        }
    },
    {
        title: "运行时间",
        dataIndex: 'execute_time',
        render: (time)=>(time==-1)?"N/A":`${time} ms`
    },
    {
        title: "内存消耗",
        dataIndex: 'memory',
        render: (memory)=>(memory==-1)?"N/A":`${memory} KB`
    },
    {
        title: "语言",
        dataIndex: 'language',
    },
    {
        title: "提交时间",
        dataIndex: 'submit_time',
    }
]

const getHistoryData = async (problem_id)=>{
    let url = `/api/history`
    let res = await axios.get(url, {params:{problem_id}});
    return res.data.data;
}

export default function HistoryList(){
    const { id } = useParams();
    const [data, setData] = useState([]);

    const updateHistoryData = async ()=>{
        let data = await getHistoryData(id);
        setData(data);
    }

    useEffect(()=>{
        updateHistoryData();
    }, [])

    return(
        <Table
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
        />
    )
}