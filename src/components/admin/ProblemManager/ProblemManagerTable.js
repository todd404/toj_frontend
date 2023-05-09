import { Table } from 'antd'
import ProblemLink from "../../problemset/ProblemLink"
import DeleteIcon from './DeleteIcon'
import EditLink from './EditLink'

const columns = [
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
    {
        title: "编辑",
        render: (_, {id})=><EditLink id={id}/>
    },
    {
        title: "删除",
        render: (_, {id})=><DeleteIcon/>
    }
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