import { createContext, useContext } from "react";
import AppointmentStore from "./appointmentStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import PrescriptionStore from "./prescriptionStore";

interface Store {
  userStore: UserStore;
  
  prescriptionStore: PrescriptionStore;
  commonStore: CommonStore;
  appointmentStore: AppointmentStore;
  modalStore: ModalStore;
}

export const store: Store = {
  userStore: new UserStore(),
  
  prescriptionStore: new PrescriptionStore(),
  commonStore: new CommonStore(),
  appointmentStore: new AppointmentStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
