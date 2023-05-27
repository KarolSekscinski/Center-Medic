import axios, { AxiosResponse } from "axios";


const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Appointments = {
  list: () => request.get<Appointment[]>("/appointments"),
  details: (id: string) => request.get<Appointment>(`/appointments/${id}`),
  create: (appointment: Appointment) => request.post<void>(`/appointments`, appointment),
  update: (appointment: Appointment) => axios.put<void>(`/appointments/${appointment.id}`, appointment),
  delete: (id: string) => axios.delete<void>(`/appointments/${id}`)
};

const agent = {
  Appointments,
};

export default agent;
