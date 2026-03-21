// models/api.ts
import { message } from 'antd';

type OptionType = RequestInit & { params?: Record<string, any> };

async function fetchData<T>(url: string, initOptions: OptionType): Promise<T> {
  const apiEndpoint = new URL(url, process.env.API_URL);
  const requestOptions: OptionType = {
    credentials: 'include',
    ...initOptions,
  };
  if (requestOptions.params) {
    for (const [key, value] of Object.entries(requestOptions.params)) {
      apiEndpoint.searchParams.set(key, value.toString());
    }
  }
  if (requestOptions.body) {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }
  if (requestOptions.headers) {
    requestOptions.headers = {
      ...requestOptions.headers,
      'Content-Type': 'application/json',
    };
  } else {
    requestOptions.headers = {
      'Content-Type': 'application/json',
    };
  }
  const res = await fetch(apiEndpoint.toString(), requestOptions);
  if (!res.ok) {
    if (res.status === 401) {
      message.error('无权限');
    }
  }

  const { data } = await res.json();
  return data;
}

async function mutateData<T>(url: string, { arg }: { arg: OptionType }): Promise<T> {
  return fetchData(url, arg);
}

export { fetchData, mutateData };
