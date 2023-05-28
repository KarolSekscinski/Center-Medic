import { createContext, useContext } from "react";
import AppointmentStore from "./appointmentStore";

interface Store {
  appointmentStore: AppointmentStore;
}

export const store: Store = {
  appointmentStore: new AppointmentStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}