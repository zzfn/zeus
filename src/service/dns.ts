import http from 'utils/http';

export async function dnsDomains(params: any): Promise<any> {
  return http({
    url: '/dns/domains',
    method: 'get',
    params,
  });
}

export async function dnsList(params: any): Promise<any> {
  return http({
    url: '/dns/list',
    method: 'get',
    params,
  });
}
export async function addDns(data: any): Promise<any> {
  return http({
    url: '/dns/add',
    method: 'post',
    data,
  });
}
export async function updateDns(data: any): Promise<any> {
  return http({
    url: '/dns/update',
    method: 'post',
    data,
  });
}
export async function removeDns(data: any) {
  return http({
    url: `/dns/del`,
    method: 'post',
    data,
  });
}
