import http from 'utils/http';

export async function getPerformance(): Promise<any> {
  return http({
    url: '/trace/getPerformance',
    method: 'get',
  });
}
export async function getHomeOverview(): Promise<any> {
  return http({
    url: '/overview/getHomeOverview',
    method: 'get',
  });
}
