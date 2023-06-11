import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import AppointmentDashBoard from "../../features/appointments/dashboard/AppointmentDashBoard";
import AppointmentForm from "../../features/appointments/form/AppointmentForm";
import AppointmentDetails from "../../features/appointments/details/AppointmentDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import PrescriptionDashBoard from "../../features/prescriptions/dashboard/PrescriptionDashBoard";
import PrescriptionDetails from "../../features/prescriptions/details/PrescriptionDetails";
import PrescriptionForm from "../../features/prescriptions/form/PrescriptionForm";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "appointments/user/:id",
        element: <AppointmentDashBoard />,
      },
      {
        path: "appointments/:id",
        element: <AppointmentDetails />,
      },
      {
        path: "createAppointment",
        element: <AppointmentForm key="create" />,
      },
      {
        path: "prescriptions/user/:id",
        element: <PrescriptionDashBoard />,
      
      },
      {
        path: "prescriptions/:id",
        element: <PrescriptionDetails />,
      },
      {
        path: "createPrescription",
        element: <PrescriptionForm key="create" />,
      },
      {
        path: "manage/:id",
        element: <AppointmentForm key="manage" />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "errors",
        element: <TestErrors />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "server-error",
        element: <ServerError />,
      },
      {
        path: "*",
        element: <Navigate replace to='/not-found' />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
