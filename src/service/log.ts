import http from 'utils/http';

export async function logPage(params: any): Promise<any> {
  return http({
    url: '/search/log',
    method: 'get',
    params,
  });
}

export function logUser(): Promise<any> {
  return http({
    url: '/search/log/user',
    method: 'get',
  });
}
export async function deleteLog(data: any): Promise<any> {
  return http({
    url: '/search/delete',
    method: 'post',
    data,
  });
}
