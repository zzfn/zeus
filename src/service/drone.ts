import http from 'utils/http';

export async function droneRepos(data: any): Promise<any> {
  return http({
    url: '/drone/repos',
    method: 'get',
    data,
  });
}

export async function droneBuilds(params: any): Promise<any> {
  return http({
    url: '/drone/builds',
    method: 'get',
    params
  });
}
