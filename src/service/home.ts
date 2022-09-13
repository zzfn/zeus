import http from 'utils/http';

export async function getHomeOverview(): Promise<any> {
  return http({
    url: '/overview/getHomeOverview',
    method: 'get',
  });
}
