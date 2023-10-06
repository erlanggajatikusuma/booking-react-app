// api/apiUtils.ts
import axios, {AxiosResponse} from 'axios';
// import {API_URL} from '../env';

// API 1
export const API_URL = 'https://parseapi.back4app.com/classes/hotel/bVonXoSUHK';

// API 2
export const API_URL_2 =
  'https://parseapi.back4app.com/classes/Review/pGLq0d1eLK';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

const request = async <T>(
  url: string,
  method: string,
  headers: any,
  data?: any,
): Promise<T> => {
  const response: AxiosResponse<T> = await instance.request({
    url,
    method,
    headers,
    data,
  });

  if (!response.data) {
    throw new Error('Response data not available');
  }

  return response.data;
};

export const apiRequest = async <T>(
  url: string,
  method: string,
  headers: any,
  data?: any,
): Promise<T> => request<T>(url, method, headers, data);

export const get = async <T>(url: string, headers: any): Promise<T> =>
  apiRequest<T>(url, 'GET', headers);

export const post = async <T>(
  url: string,
  headers: any,
  data: any,
): Promise<T> => apiRequest<T>(url, 'POST', headers, data);

export const put = async <T>(
  url: string,
  headers: any,
  data: any,
): Promise<T> => apiRequest<T>(url, 'PUT', headers, data);

export const del = async <T>(url: string, headers: any): Promise<T> =>
  apiRequest<T>(url, 'DELETE', headers);
