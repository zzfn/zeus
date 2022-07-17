import {Select} from "antd";
import {useEffect, useState} from "react";
import {fetchDict} from "../service/common";

const SelectCode = (props:any) => {
    const { code } = props;
    const [list, setList] = useState([]);
    const handleFetchList = async () => {
        const { data } = await fetchDict({ code });
        setList(data);
    };
    useEffect(() => {
        handleFetchList().then();
    }, [code]);
    return (
        <Select
            {...props}
            allowClear
            showSearch
            style={{ width: '100%' }}
            filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {list.map((item: any) => (
                <Select.Option key={item.id} value={item.code}>
                    {item.name}
                </Select.Option>
            ))}
        </Select>
    )
}
export default SelectCode