import http from 'utils/http';

export async function resourceList(data: any): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/resource/list',
    method: 'post',
    data,
  });
}
