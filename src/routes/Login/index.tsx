import {Form, Input, Button} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {login} from "../../service/user";
import styles from './index.module.less';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {useEffect} from "react";

const Login = () => {
    let user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const onFinish = async (values: any) => {
        const {data, code} = await login(values);
        if (code === 0) {
            sessionStorage.setItem('uid', data.token);
            dispatch({type: 'user/updateUserState'})
            dispatch({type: 'user/updateUserInfo'})
        }
    };

    const navigate = useNavigate();
    useEffect(()=>{
        console.log(user)
        if(user.loginState){
            navigate('/workspace');
        }
    },[user])

    return <div className={styles.loginContainer}>
        <Form
            className={styles.loginForm}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    登录
                </Button>
            </Form.Item>
            <Link to="/register">去注册</Link>
        </Form>
    </div>
}
export default Login
