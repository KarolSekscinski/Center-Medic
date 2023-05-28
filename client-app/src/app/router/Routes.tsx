import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import AppointmentDashBoard from "../../features/appointments/dashboard/AppointmentDashBoard";
import AppointmentForm from "../../features/appointments/form/AppointmentForm";
import AppointmentDetails from "../../features/appointments/details/AppointmentDetails";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "appointments",
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
        path: "manage/:id",
        element: <AppointmentForm key="manage" />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
