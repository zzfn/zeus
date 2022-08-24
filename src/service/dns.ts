import http from 'utils/http';

export async function dnsList(params: any): Promise<any> {
  return http({
    baseURL: process.env.GATEWAY_URL,
    url: '/dns/list',
    method: 'get',
    params,
  });
}

export async function articleOne(params: any): Promise<any> {
  return http({
    url: `/article/${params.id}`,
    method: 'get',
  });
}

export async function saveArticle(data: any): Promise<any> {
  return http({
    url: '/article/save',
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
