import http from 'utils/http';

export async function articlePage(params: any): Promise<any> {
    return http({
        url: '/article/page',
        method: 'get',
        params,
    });
}

export async function getUserState(): Promise<any> {
    return http({
        url: '/user/getUserState',
        method: 'get',
    });
}

export async function getUserInfo(): Promise<any> {
    return http({
        url: '/user/getUserInfo',
        method: 'get',
    });
}
