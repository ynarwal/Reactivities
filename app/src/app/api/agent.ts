import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/Activity";

axios.defaults.baseURL = 'http://localhost:5000/api'

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  })
}

axios.interceptors.response.use(async (res) => {
  await sleep(1000);
  return res;
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data

const requests = {
  get: <T> (url: string) => axios.get(url).then(responseBody<T>),
  post: <T> (url: string, body: {}) => axios.post(url, body).then(responseBody<T>),
  put: <T> (url: string, body: {}) => axios.put(url, body).then(responseBody<T>),
  delete: <T> (url: string) => axios.delete(url).then(responseBody<T>),
}

const Activities = {
  list: () => requests.get<Activity[]>('/activities'),
  details: (id: string) => requests.get<Activity>(`/activities/${id}/`),
  create: (activity: Activity) => requests.post<void>('/activities', activity),
  update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}/`, activity),
  delete: (id: string) => axios.delete<void>(`/activities/${id}`)
}

const agent = {
  Activities,
}

export default agent;
