import { Input } from "antd";


export default function LimitInput({value, onChange, unit}){
    return(
        <div>
            <Input
                type={"number"}
                style={{width: "3em"}}
                {...{value, onChange}}
            ></Input>
            <span>{unit}</span>
        </div>
    )
}