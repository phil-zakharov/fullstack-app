import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export async function typedFetchBaseQuery(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) {
  const result = await fetchBaseQuery({ baseUrl: '/api' })(args, api, extraOptions);

  if (result.error) {
    return {
      error: {
        status: result.error.status,
        data: result.error.data as { message: string; code?: number },
      },
    };
  }

  return result;
}
