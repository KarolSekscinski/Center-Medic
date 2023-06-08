import { createContext, useContext } from "react";
import AppointmentStore from "./appointmentStore";
import CommonStore from './commonStore';
import UserStore from "./userStore";
import ModalStore from "./modalStore";



interface Store {
  appointmentStore: AppointmentStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
}

export const store: Store = {
  appointmentStore: new AppointmentStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}