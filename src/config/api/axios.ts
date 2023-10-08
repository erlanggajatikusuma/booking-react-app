// __mocks__/axios.js (JavaScript) or __mocks__/axios.ts (TypeScript)
import {jest} from 'jest';

export default {
  create: jest.fn(() => ({
    request: jest.fn(() => Promise.resolve({data: {}})),
  })),
};
