import http from 'utils/http';

export async function getHomeOverview(): Promise<any> {
  return http({
    baseURL: process.env.API_URL,
    url: '/overview/getHomeOverview',
    method: 'get',
  });
}
