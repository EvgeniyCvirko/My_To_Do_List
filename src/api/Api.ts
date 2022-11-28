import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    "API-KEY": 'adcfde77-24ec-4f29-9821-c3a1b9dacd02',
  },
  withCredentials: true,
});