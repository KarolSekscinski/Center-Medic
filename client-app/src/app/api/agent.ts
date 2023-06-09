import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";
import { Appointment, AppointmentFormValues } from "../models/appointment";
import { Prescription, PrescriptionFormValues } from "../models/prescription";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          router.navigate("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Appointments = {
  list: (userId: string) =>
    request.get<Appointment[]>(`/appointments/user/${userId}`),
  details: (id: string) => request.get<Appointment>(`/appointments/${id}`),
  create: (appointment: AppointmentFormValues) =>
    request.post<void>(`/appointments`, appointment),
  update: (appointment: AppointmentFormValues) =>
    request.put<void>(`/appointments/${appointment.id}`, appointment),
  delete: (id: string) => request.delete<void>(`/appointments/${id}`),
  attend: (id: string) => request.post<void>(`/appointments/${id}/attend`, {}),
};

const Prescriptions = {
  list: (userId: string) =>
    request.get<Prescription[]>(`/prescriptions/user/${userId}`),
  details: (id: string) => request.get<Prescription>(`/prescriptions/${id}`),
  create: (prescription: PrescriptionFormValues) =>
    request.post<void>(`/prescriptions`, prescription),
  update: (prescription: PrescriptionFormValues) =>
    request.put<void>(`/prescriptions/${prescription.id}`, prescription),
  delete: (id: string) => request.delete<void>(`/prescriptions/${id}`),
  attend: (id: string) => request.post<void>(`/prescriptions/${id}/take`, {}),
};

const Account = {
  current: () => request.get<User>("/account"),
  login: (user: UserFormValues) => request.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    request.post<User>("/account/register", user),
  doctors: () => request.get<User[]>("/account/doctors"),
  patients: () => request.get<User[]>("/account/patients"),
};

const agent = {
  Appointments,
  Prescriptions,
  Account,
};

export default agent;
