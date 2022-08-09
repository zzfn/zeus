import http from 'utils/http';

export async function deviceList(params: any): Promise<any> {
  return http({
    url: '/device/list',
    method: 'get',
    params,
  });
}

export async function deviceOne(params: any): Promise<any> {
  return http({
    url: `/device/${params.id}`,
    method: 'get',
  });
}

export async function saveDevice(data: any): Promise<any> {
  return http({
    url: '/device/save',
    method: 'post',
    data,
  });
}
export async function removeArticle(params: { id: string }) {
  return http({
    url: `/article/${params.id}`,
    method: 'delete',
  });
}