import { AlignLeftOutlined, CommentOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useSelectedRoutes } from 'umi'
import "./css/ProblemTab.css"

const items = [
    {
        key: 'discribe',
        label: (<span>
            <AlignLeftOutlined />
            题目描述
        </span>),
        children: (
            <Outlet></Outlet> 
        )
    },
    {
        key: 'comment',
        label: (<span>
            <CommentOutlined />
            评论
        </span>),
        children: (
            <Outlet></Outlet>
        )
    },
    {
        key: 'history',
        label: (<span>
            <ClockCircleOutlined />
            提交记录
        </span>),
        children: (
            <Outlet></Outlet>
        )
    },
]

export default function ProblemTab(){
    const navigate = useNavigate();
    const routes = useSelectedRoutes();

    useEffect(()=>{
        let path = routes.lastItem.route.path;
        setActiveKey(path);
    }, [routes])

    const handleTabChange = (activeKey)=>{
        navigate(activeKey);
    }

    const [activeKey, setActiveKey] = useState("");

    return(
        <Tabs
            activeKey={activeKey}
            className="problem-tab" 
            style={{maxHeight: "100%"}} 
            defaultActiveKey='discribe'
            items={items}
            onChange={handleTabChange}
        />
    )
}