// models/api.ts
type OptionType = RequestInit & { params?: Record<string, any> };

async function fetchData<T>(url: string, initOptions: OptionType): Promise<T> {
  const apiEndpoint = new URL(url, process.env.API_URL);
  if (initOptions?.params) {
    for (const [key, value] of Object.entries(initOptions.params)) {
      apiEndpoint.searchParams.set(key, value.toString());
    }
  }
  if (initOptions?.body) {
    initOptions.body = JSON.stringify(initOptions.body);
  }
  const uid = localStorage.getItem('uid');
  if (initOptions?.headers) {
    initOptions.headers = {
      ...initOptions.headers,
      'Content-Type': 'application/json',
    };
  } else {
    initOptions.headers = {
      'Content-Type': 'application/json',
    };
  }
  if (uid) {
    initOptions.headers = {
      ...initOptions.headers,
      uid: uid,
    };
  }
  const res = await fetch(apiEndpoint.toString(), initOptions);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  const { data } = await res.json();
  return data;
}

async function mutateData<T>(url: string, { arg }: { arg: OptionType }): Promise<T> {
  return fetchData(url, arg);
}

export { fetchData, mutateData };
