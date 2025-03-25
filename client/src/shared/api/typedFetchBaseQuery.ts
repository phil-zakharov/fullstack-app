import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '~/app/store';
import { setToken } from '~/features/user/store';

export async function typedFetchBaseQuery(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) {
  const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders(headers, { getState }) {
      const state = getState() as RootState;

      if (state.user.accessToken) {
        headers.set('Authorization', `Bearer ${state.user.accessToken}`);
      }

      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    switch (result.error.status) {
      case 402:
        // eslint-disable-next-line no-case-declarations
        const refreshResult = (await baseQuery('/user/refresh', api, extraOptions)) as {
          data: { accessToken: string };
        };
        console.log(' refreshResult:', refreshResult);

        if (refreshResult.data) {
          api.dispatch(setToken(refreshResult.data.accessToken));

          result = await baseQuery(args, api, extraOptions);
        }
        break;
      default:
        return {
          error: {
            status: result.error.status,
            data: result.error.data as { message: string; code?: number },
          },
        };
    }
  }

  return result;
}
