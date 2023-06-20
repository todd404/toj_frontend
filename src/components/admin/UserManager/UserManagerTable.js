import { Table } from 'antd'
import DeleteIcon from './DeleteIcon'
import EditLink from './EditLink'

export default function UserManagerTable({loading, dataSource, onUserDelete}){
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
            render: (_, {userid})=><DeleteIcon onClick={()=>{onUserDelete(userid)}}/>
        }
    ]

    return(
        <Table 
            columns={columns}
            rowKey={(record) => record.id}
            {...{loading, dataSource}}
        >
        </Table>
    )
}