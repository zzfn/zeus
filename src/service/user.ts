import http from 'utils/http';

export async function login(data: any): Promise<any> {
  return http({
    url: 'v1/app-users/login',
    method: 'post',
    data,
  });
}

export async function userRegister(data: any): Promise<any> {
  return http({
    url: 'v1/app-users/register',
    method: 'post',
    data,
  });
}

export async function getUserState(): Promise<any> {
  return http({
    url: 'v1/app-users/me',
    method: 'get',
  });
}

export async function getUserInfo(): Promise<any> {
  return http({
    url: 'v1/app-users/me',
    method: 'get',
  });
}

export async function userList(): Promise<any> {
  return http({
    url: '/user/list',
    method: 'get',
  });
}

export async function infoById(params: any): Promise<any> {
  return http({
    url: '/user/infoById',
    method: 'get',
    params,
  });
}

export async function changeUser(data: any): Promise<any> {
  return http({
    url: '/user/changeUser',
    method: 'post',
    data,
  });
}

export async function changeRoleByUserId(data: any): Promise<any> {
  return http({
    url: '/user/changeRoleByUserId',
    method: 'post',
    data,
  });
}
