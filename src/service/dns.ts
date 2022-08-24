import http from 'utils/http';

export async function dnsDomains(params: any): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/dns/domains',
    method: 'get',
    params,
  });
}

export async function dnsList(params: any): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/dns/list',
    method: 'get',
    params,
  });
}

export async function removeDns(data: any) {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: `/dns/del`,
    method: 'post',
    data,
  });
}
