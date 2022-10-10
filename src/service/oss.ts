import http from 'utils/http';

export async function files(params: any): Promise<any> {
  return http({
    url: '/file/files',
    method: 'get',
    params,
  });
}
