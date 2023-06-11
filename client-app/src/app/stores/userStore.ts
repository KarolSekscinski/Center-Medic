import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
  user: User | null = null;
  doctors: User[] = [];
  patients: User[] = [];

  constructor() {
    makeAutoObservable(this);
  }
  get isLoggedIn() {
    return !!this.user;
  }
  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);

      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      this.user!.isDoctor = user.isDoctor;
      
      this.user!.appUserId= user.appUserId;

      router.navigate("/");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };
  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds);

      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      router.navigate("/");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };
  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
  };
  getUser = async () => {
    try {
      const user = await agent.Account.current();

      runInAction(() => {
        this.user = user;
        this.user.isDoctor = user.isDoctor;
        this.user.appUserId = user.appUserId;
      });
      console.log(this.user);
    } catch (error) {
      console.log(error);
    }
  };
  getDoctors = async () => {
    try {
      const doctors = await agent.Account.doctors();

      runInAction(() => {
        this.doctors = doctors;
      });
      
    } catch (error) {
      console.log(error);
    }
  }
  getPatients = async () => {
    try {
      const patients = await agent.Account.patients();

      runInAction(() => {
        this.patients = patients;
      });
      
    } catch (error) {
      console.log(error);
    }
  }
}
