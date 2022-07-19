import {useState} from 'react';
import ZeusTable from 'components/ZeusTable';
import Access from 'components/Access';
import useAccess from 'hooks/useAccess';
import {deleteLog, logPage} from "../../service/log";
import { useNavigate } from 'react-router-dom';
import {message} from "antd";

const LogList = () => {
    const access = useAccess();
    const navigate=useNavigate()
    const [params] = useState({});
    const handleDelete = (id: string) => async () => {
        const {data} = await deleteLog({id})
        message.success(data)
        navigate(0)
    }
    const columns = [
        {
            title: '浏览器',
            dataIndex: 'browser',
        },
        {
            title: '浏览器版本',
            dataIndex: 'browserVersion',
        },
        {
            title: '类型',
            dataIndex: 'name',
        },
        {
            title: 'ip',
            dataIndex: 'ip',
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
            render: (_: string, record: any) => (
                <Access accessible={access.isAdmin}>
                    <a onClick={handleDelete(record.id)}>删除</a>
                </Access>
            ),
        },
    ];

    return (
        <>
            <ZeusTable columns={columns} service={logPage} params={params}/>
        </>
    );
};

export default LogList;
