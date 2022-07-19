import http from 'utils/http';

export async function logPage(params: any): Promise<any> {
  return http({
    url: '/log/search',
    method: 'get',
    params,
  });
}

export async function deleteLog(data: any): Promise<any> {
  return http({
    url: '/log/delete',
    method: 'post',
    data,
  });
}
