import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { message } from 'antd';

interface ResponseType {
  msg?: string;
  data?: unknown;
  code?: number;
  errcode?: number;
  success: boolean;
}

const msg = new Map([
  [200, '服务器成功返回请求的数据'],
  [201, '新建或修改数据成功'],
  [202, '一个请求已经进入后台排队（异步任务）'],
  [204, '删除数据成功'],
  [400, '发出的请求有错误，服务器没有进行新建或修改数据的操作'],
  [401, '用户没有权限（令牌、用户名、密码错误）'],
  [403, '用户得到授权，但是访问是被禁止的'],
  [404, '发出的请求针对的是不存在的记录，服务器没有进行操作'],
  [405, '请求方法不被允许'],
  [406, '请求的格式不可得'],
  [410, '请求的资源被永久删除，且不会再得到的'],
  [422, '当创建一个对象时，发生一个验证错误'],
  [500, '服务器发生错误，请检查服务器'],
  [502, '网关错误'],
  [503, '服务不可用，服务器暂时过载或维护'],
  [504, '网关超时'],
]);
const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  validateStatus: () => true,
});
instance.interceptors.request.use(
  (config) => {
    const Authorization = sessionStorage.getItem('uid')
      ? `Bearer ${sessionStorage.getItem('uid')}`
      : '';
    if (config.headers) {
      Reflect.set(config.headers, 'Authorization', Authorization);
      Reflect.set(config.headers, 'System', 'admin');
    } else {
      config.headers = { Authorization, System: 'admin' };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
instance.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      return message.error(msg.get(response.status)).then();
    }
    if (response.data.code !== 0) {
      return message.error(response.data.msg || response.data.message).then();
    }
    if (response.data.code === 4001) {
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

function http(config: AxiosRequestConfig): Promise<ResponseType> {
  return instance(config) as unknown as Promise<ResponseType>;
}

export default http;
