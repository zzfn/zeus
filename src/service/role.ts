import http from 'utils/http';

export async function roleList(data: any): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/role/list',
    method: 'get',
    data,
  });
}
export async function roleSave(data: any): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/role/save',
    method: 'post',
    data,
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
    url: '/user/list',
    method: 'get',
  });
}