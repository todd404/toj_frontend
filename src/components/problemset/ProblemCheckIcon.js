import { CheckCircleTwoTone } from '@ant-design/icons';
import { Tooltip } from 'antd';

export default function ProblemCheckIcon(){
    return(
        <Tooltip title="已解答">
            <CheckCircleTwoTone twoToneColor="#3FCA7D"/>
        </Tooltip>
    )
}