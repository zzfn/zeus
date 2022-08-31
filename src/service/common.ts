import http from 'utils/http';

export async function fetchDict(params: any): Promise<any> {
  return http({
    baseURL: process.env.API_URL,
    url: '/sysDict/getDict',
    method: 'get',
    params,
  });
}
