import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class AppointmentStore {
  appointmentRegistry = new Map<string, Appointment>();
  selectedAppointment: Appointment | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get appointmentsByDate() {
    return Array.from(this.appointmentRegistry.values()).sort(
      (a, b) => Date.parse(a.dateOfIssue) - Date.parse(b.dateOfIssue)
    );
  }

  loadAppointments = async () => {
    try {
      const appointments = await agent.Appointments.list();

      appointments.forEach((appointment) => {
        appointment.dateOfIssue = appointment.dateOfIssue.split("T")[0];
        this.appointmentRegistry.set(appointment.id, appointment);

        this.setLoadingInitial(false);
      });
    } catch (error) {
      console.log(error);

      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectAppointment = (id: string) => {
    this.selectedAppointment = this.appointmentRegistry.get(id);
  };

  cancelSelectedAppointment = () => {
    this.selectedAppointment = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectAppointment(id) : this.cancelSelectedAppointment();
    this.editMode = true;
  };
  closeForm = () => {
    this.editMode = false;
  };

  createAppointment = async (appointment: Appointment) => {
    this.loading = true;
    appointment.id = uuid();
    try {
      await agent.Appointments.create(appointment);
      runInAction(() => {
        this.appointmentRegistry.set(appointment.id, appointment);
        this.selectedAppointment = appointment;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  updateAppointment = async (appointment: Appointment) => {
    this.loading = true;
    try {
      await agent.Appointments.update(appointment);
      runInAction(() => {
        this.appointmentRegistry.set(appointment.id, appointment);
        this.selectedAppointment = appointment;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  deleteAppointment = async (id: string) => {
    this.loading = true;
    try {
      await agent.Appointments.delete(id);
      runInAction(() => {
        this.appointmentRegistry.delete(id);
        if (this.selectedAppointment?.id === id) {
          this.cancelSelectedAppointment();
        }
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
