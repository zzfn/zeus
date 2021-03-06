import http from 'utils/http';

export async function login(data: any): Promise<any> {
  return http({
    url: '/user/login',
    method: 'post',
    data,
  });
}

export async function getUserState(): Promise<any> {
  return http({
    url: '/user/getUserState',
    method: 'get',
  });
}

export async function getUserInfo(): Promise<any> {
  return http({
    url: '/user/getUserInfo',
    method: 'get',
  });
}
