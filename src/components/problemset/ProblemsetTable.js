import {CheckCircleOutlined} from '@ant-design/icons'
import { Table } from 'antd'
import ProblemCheckIcon from './ProblemCheckIcon'
import ProblemLink from './ProblemLink'

const columns = [
    {
        title: "状态",
        dataIndex: 'state',
        render: (_, {state})=>state?<ProblemCheckIcon />:<div></div>
    },
    {
        title: "题目",
        dataIndex: ['id', 'title'],
        render: (_, {id, title})=><ProblemLink {...{id, title}}/>,
        sorter: (a, b) => a.id - b.id
    },
    {
        title: "通过率",
        dataIndex: 'acceptance_rate',
        render: (rate)=>`${rate}%`,
        sorter: (a, b) => a.acceptance_rate - b.acceptance_rate
    },
    {
        title: "难度",
        dataIndex: 'difficulty',
        sorter: (a, b) => a.difficulty - b.difficulty,
    },
]

export default function ProblemsetTable(props){
    return(
        <Table 
            columns={columns}
            rowKey={(record) => record.id}
            {...props}
        >
        </Table>
    )
}