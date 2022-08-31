import http from 'utils/http';

export async function resourceList(data: any): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/resource/list',
    method: 'get',
    data,
  });
}

export async function resourceById(params: any): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/resource/listById',
    method: 'get',
    params,
  });
}

export async function resourceSave(data: any): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/resource/save',
    method: 'post',
    data,
  });
}
