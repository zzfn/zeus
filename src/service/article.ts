import http from 'utils/http';

export async function articlePage(params: any): Promise<any> {
  return http({
    url: '/article/page',
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
