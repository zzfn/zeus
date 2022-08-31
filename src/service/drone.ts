import http from 'utils/http';

export async function droneRepos(data: any): Promise<any> {
  return http({
    baseURL: process.env.API_URL,
    url: '/drone/repos',
    method: 'get',
    data,
  });
}

export async function droneBuilds(params: any): Promise<any> {
  return http({
    baseURL: process.env.API_URL,
    url: '/drone/builds',
    method: 'get',
    params,
  });
}

export async function droneBuildCreate(data: any): Promise<any> {
  return http({
    baseURL: process.env.API_URL,
    url: '/drone/buildCreate',
    method: 'post',
    data,
  });
}
