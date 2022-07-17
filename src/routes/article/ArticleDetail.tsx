import {Button, Card, Form, Input, message, Space} from "antd";
import SelectCode from "../../components/SelectCode";
import MarkdownEditor from "../../components/MarkdownEditor";
import {useParams} from "react-router-dom";
import {articleOne} from "../../service/article";
import {useEffect} from "react";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
        md: { span: 22 },
    },
};

const submitFormLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 11 },
        sm: { span: 10, offset: 11 },
    },
};
const ArticleDetail = () => {
    const [form] = Form.useForm();
    const params = useParams();
    const onFinish = async (values: Record<string, any>): Promise<void> => {
        console.log(values)
    };
    const handleFetchArticle = async (id:string) => {
        const { data, msg } = await articleOne({ id });
        if (msg === 'success') {
            form.setFieldsValue(data);
        } else {
            message.error('未知错误');
        }
    };
    useEffect(() => {
        params.id && handleFetchArticle(params.id).then();
    }, [params.id]);
    return (
        <>
            <Card bordered={false}>
                <Form
                    {...formItemLayout}
                    style={{marginTop: 8}}
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label={'标题'}
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: '88',
                            },
                        ]}
                    >
                        <Input placeholder={'请输入标题'}/>
                    </Form.Item>
                    <Form.Item
                        label={'标签'}
                        name="tag"
                        rules={[
                            {
                                required: true,
                                message: '请选择标签',
                            },
                        ]}
                    >
                        <SelectCode placeholder={'请选择标签'} code={'TAG'}/>
                    </Form.Item>
                    <Form.Item
                        label={'排序号'}
                        name="orderNum"
                        rules={[
                            {
                                required: true,
                                message: '请输入排序号',
                            },
                        ]}
                    >
                        <Input placeholder={'请输入排序号'}/>
                    </Form.Item>
                    <Form.Item
                        label={'文章'}
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: '请选择标签',
                            },
                        ]}
                    >
                        <MarkdownEditor />
                    </Form.Item>
                    <Form.Item {...submitFormLayout} style={{marginTop: 32}}>
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                发布
                            </Button>
                            <Button htmlType="submit">
                                保存
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
}

export default ArticleDetail
