import http from 'utils/http';

export async function menuList(data: any): Promise<any> {
  return http({
    url: '/menu/list',
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
