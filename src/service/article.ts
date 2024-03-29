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
    url: `/article/getOne`,
    method: 'get',
    params,
  });
}

export async function saveArticle(data: any): Promise<any> {
  return http({
    url: '/article/save',
    method: 'post',
    data,
  });
}

export async function removeArticle(params: { id: string }) {
  return http({
    url: `/article/${params.id}`,
    method: 'delete',
  });
}

export async function resetElastic() {
  return http({
    url: `/article/resetElastic`,
    method: 'post',
  });
}

export async function topSearch() {
  return http({
    url: `/article/topSearch`,
    method: 'get',
  });
}

export async function uploadFile(data: FormData) {
  return http<string[]>({
    url: '/v1/files/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
