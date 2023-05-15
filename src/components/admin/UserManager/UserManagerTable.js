import { Table } from 'antd'
import DeleteIcon from './DeleteIcon'
import EditLink from './EditLink'

const columns = [
    {
        title: "用户id",
        dataIndex: 'userid',
        sorter: (a, b) => a.id - b.id
    },
    {
        title: "用户名",
        dataIndex: 'username',
    },
    {
        title: "编辑",
        render: (_, {userid})=><EditLink id={userid}/>
    },
    {
        title: "删除",
        render: (_, {userid})=><DeleteIcon/>
    }
]

export default function UserManagerTable(props){
    return(
        <Table 
            columns={columns}
            rowKey={(record) => record.id}
            {...props}
        >
        </Table>
    )
}