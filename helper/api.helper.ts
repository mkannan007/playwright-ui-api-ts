import { APIRequestContext, APIResponse, request } from '@playwright/test';

import { API_BASE_URL } from 'config/base.config';

const apiRequest = async (): Promise<APIRequestContext> => {
  return await request.newContext({
    baseURL: API_BASE_URL,
  });
};

export const apiGetRequest = async (
  endPoint: string,
  params?: Record<string, string | number | boolean>,
) => {
  const context = await apiRequest();

  if (params) {
    return await context.get(endPoint, {
      params: params,
    });
  } else {
    return await context.get(endPoint);
  }
};

export const apiPostRequest = async (
  endPoint: string,
  body?: Record<string, string | number | boolean | object>,
): Promise<APIResponse> => {
  const context = await apiRequest();

  if (body) {
    return context.post(endPoint, {
      data: body,
    });
  } else {
    return (await apiRequest()).post(endPoint);
  }
};

export const apiDeleteRequest = async (
  endPoint: string,
): Promise<APIResponse> => {
  const context = await apiRequest();

  return context.delete(endPoint);
};
