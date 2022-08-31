import http from 'utils/http';

export async function login(data: any): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/user/login',
    method: 'post',
    data,
  });
}
export async function userRegister(data: any): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/user/register',
    method: 'post',
    data,
  });
}
export async function getUserState(): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/user/getUserState',
    method: 'get',
  });
}

export async function getUserInfo(): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/user/getUserInfo',
    method: 'get',
  });
}

export async function userList(): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/user/list',
    method: 'get',
  });
}
export async function infoById(params: any): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/user/infoById',
    method: 'get',
    params,
  });
}
export async function changeUser(data: any): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/user/changeUser',
    method: 'post',
    data,
  });
}
