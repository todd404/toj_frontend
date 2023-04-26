import { AlignLeftOutlined, CommentOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Tabs } from 'antd';
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import ProblemComment from './Comment/ProblemComment';
import "./css/ProblemTab.css"

const items = [
    {
        key: '1',
        label: (<span>
            <AlignLeftOutlined />
            题目描述
        </span>),
        children: (
        <div style={{backgroundColor: "white"}}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {'# markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n # markdown\n'}
            </ReactMarkdown>
        </div>   
        )
    },
    {
        key: '2',
        label: (<span>
            <CommentOutlined />
            评论
        </span>),
        children: (
            <ProblemComment></ProblemComment>
        )
    },
    {
        key: '3',
        label: (<span>
            <ClockCircleOutlined />
            提交记录
        </span>)
    },
]

export default function ProblemTab(){
    return(
        <Tabs className="problem-tab" style={{maxHeight: "100%"}} defaultActiveKey='1' items={items}></Tabs>
    )
}