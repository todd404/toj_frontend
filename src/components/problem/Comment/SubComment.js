import { List, Avatar, ConfigProvider, Space, } from 'antd'
import { UpOutlined } from '@ant-design/icons'

const data = Array.from({ length: 23 }).map((_, i) => ({
    id: i,
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));


export default function SubCommnet({commnetId, onFoldCLick}){

    function FoldFooter (props){
        return(
            <Space onClick={onFoldCLick} style={{cursor: "pointer"}} {...props}>
                <UpOutlined />
                收起回复
            </Space>
        )
    }

    return(
        <ConfigProvider
            theme={{
                token:{
                    fontSize: "8px"
                }
            }}
        >
            <List
                itemLayout="horizontal"
                size="small"
                footer={<FoldFooter></FoldFooter>}
                pagination={{pageSize: 5, align: "center", size: "small"}}
                dataSource={data}
                renderItem={(item, index)=>(
                    <List.Item
                        key={item.id}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description={"这是一个子回复\n这是一个子回复\n这是一个子回复\n这是一个子回复\n这是一个子回复\n这是一个子回复\n这是一个子回复\n这是一个子回复\n这是一个子回复\n这是一个子回复\n这是一个子回复\n这是一个子回复\n"}
                        />
                    </List.Item>
                )}
            />
        </ConfigProvider>
        
    )
}