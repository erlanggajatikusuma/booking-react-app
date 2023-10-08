import {AxiosResponse} from 'axios';
import {API_URL, get} from '../../config';

const header = {
  'X-Parse-Application-Id': 'Rr9ZKgR2t2f49g5ueLWriacIrvKy8Hwv7P87FSw3',
  'X-Parse-REST-API-Key': '4C6gLjrbNGoym5m9j9mFQiDzXO5eETLxjUjY9Fzy',
};

// const header = {
//   'X-Parse-Application-Id': '5bKP3JX6zXWqpXMmI6tImTdZxDh59kb6IGVGlHHF',
//   'X-Parse-REST-API-Key': 'ovP2x3YltGJsu1t9RM6FpDNgU5n2hnQSAhatLxIq',
// };

interface GetFunctionResponse {
  success: boolean;
  data?: any; // Update this to the actual type of your data
  error?: any; // Update this to the actual error type
}

export const getBookingDetail = async (): Promise<GetFunctionResponse> => {
  try {
    const response: AxiosResponse<any> = await get(API_URL, header);
    return {success: true, data: response};
  } catch (error) {
    console.error('Getting Data error:', error);
    return {success: false, error};
  }
};
