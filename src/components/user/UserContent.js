import { Avatar, Button, List, Space } from "antd";
import { Typography } from 'antd';
const { Text } = Typography;

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
                <Button type="link" style={ { alignSelf: "center" } }>
                    退出
                </Button>
            </List.Item>
        </List>
    )
}