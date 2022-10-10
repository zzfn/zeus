import http from 'utils/http';

export async function roleSave(data: any): Promise<any> {
  return http({
    url: '/role/save',
    method: 'post',
    data,
  });
}

export async function getUserInfo(): Promise<any> {
  return http({
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
