import http from 'utils/http';

export async function shortUrlList(data: any): Promise<any> {
  return http({
    url: '/short-url/list',
    method: 'get',
    data,
  });
}

export async function menuOne(params: any): Promise<any> {
  return http({
    url: `/menu/getOne`,
    method: 'get',
    params,
  });
}
export async function menuSave(data: any): Promise<any> {
  return http({
    url: '/menu/save',
    method: 'post',
    data,
  });
}
