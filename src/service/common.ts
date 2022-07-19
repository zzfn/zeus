import http from 'utils/http';

export async function fetchDict(params: any): Promise<any> {
  return http({
    url: '/sysDict/getDict',
    method: 'get',
    params,
  });
}
