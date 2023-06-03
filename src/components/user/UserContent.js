import { Button, List } from "antd";
import { Typography } from 'antd';
import axios from "axios";
const { Text } = Typography;

const logout = async ()=>{
    let url = `/api/logout`;
    await axios.get(url);

    window.location = "/";
}

export default function UserContent({avatar, username}){
    return(
        <List
            size="small"
        >
            <List.Item style={{ flexDirection: "column" }}>
                <Text
                    style={ {width: "3em", textAlign: "center", alignSelf: "center"} }
                    ellipsis={true}
                >
                    {username}
                </Text>
            </List.Item>

            <List.Item style={ {flexDirection: "column"} }>
                <Button type="link" style={ { alignSelf: "center" } } onClick={logout}>
                    退出
                </Button>
            </List.Item>
        </List>
    )
}