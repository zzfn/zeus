import http from 'utils/http';

export async function resourceList(data: any): Promise<any> {
  return http({
    url: '/resource/list',
    method: 'get',
    data,
  });
}

export async function resourceById(params: any): Promise<any> {
  return http({
    url: '/resource/listById',
    method: 'get',
    params,
  });
}

export async function resourceSave(data: any): Promise<any> {
  return http({
    url: '/resource/save',
    method: 'post',
    data,
  });
}
