import { AlignLeftOutlined, CommentOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Tabs } from 'antd';
import { Outlet, useNavigate } from 'umi'
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

    const handleTabChange = (activeKey)=>{
        navigate(activeKey)
    }

    return(
        <Tabs 
            className="problem-tab" 
            style={{maxHeight: "100%"}} 
            defaultActiveKey='1'
            items={items}
            onChange={handleTabChange}
        />
    )
}