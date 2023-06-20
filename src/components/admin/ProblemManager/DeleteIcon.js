import { DeleteOutlined } from "@ant-design/icons";

export default function DeleteIcon({onClick}){
    return(
        <DeleteOutlined style={{cursor: "pointer"}} onClick={onClick}/>
    )
}