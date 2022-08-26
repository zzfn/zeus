import http from 'utils/http';

export async function files(params: any): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/file/files',
    method: 'get',
    params,
  });
}
