import http from 'utils/http';

export async function changelogList(data: any): Promise<any> {
  return http({
    url: '/changelog/list',
    method: 'get',
    data,
  });
}

export async function changelogOne(params: any): Promise<any> {
  return http({
    url: `/changelog/getOne`,
    method: 'get',
    params,
  });
}
export async function changelogSave(data: any): Promise<any> {
  return http({
    url: '/changelog/save',
    method: 'post',
    data,
  });
}
