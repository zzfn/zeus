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
            title: '操作系统',
            children:[
                {
                    title: 'os',
                    dataIndex: 'os',
                },
                {
                    title: 'version',
                    dataIndex: 'osVersion',
                },
            ]
        },
        {
            title: '浏览器',
            children:[
                {
                    title: 'browser',
                    dataIndex: 'browser',
                },
                {
                    title: 'version',
                    dataIndex: 'browserVersion',
                },
            ]
        },
        {
            title: '动作',
            children:[
                {
                    title: 'name',
                    dataIndex: 'name',
                },
                {
                    title: 'score',
                    dataIndex: 'value',
                },
            ]
        },
        {
            title: 'user',
            children:[
                {
                    title: 'visitorId',
                    dataIndex: 'visitorId',
                    width: 100,
                    ellipsis: true,
                    textWrap: 'word-break',
                },
                {
                    title: 'ip',
                    dataIndex: 'ip',
                    width: 100
                },
                {
                    title: 'url',
                    dataIndex: 'url',
                },
                {
                    title: 'referrer',
                    dataIndex: 'referrer',
                },
            ]
        },
        {
            title: 'time',
            dataIndex: 'time',
        },
        {
            title: '操作',
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
