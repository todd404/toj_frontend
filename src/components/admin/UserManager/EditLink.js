import { EditOutlined } from '@ant-design/icons'
import {Link} from 'umi'

export default function EditLink({id}){
    return(
        <Link to={`/admin/edit-user/${id}`}>
            <EditOutlined />
        </Link>
    )
}