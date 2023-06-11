import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { Appointment, AppointmentFormValues } from "../models/appointment";
import { store } from "./store";
import { Profile } from "../models/profile";

export default class AppointmentStore {
  appointmentRegistry = new Map<string, Appointment>();
  selectedAppointment: Appointment | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get appointmentsByDate() {
    return Array.from(this.appointmentRegistry.values()).sort(
      (a, b) => a.dateOfIssue!.getTime() - b.dateOfIssue!.getTime()
    );
  }

  get groupedAppointments() {
    return Object.entries(
      this.appointmentsByDate.reduce((appointments, appointment) => {
        const date = format(appointment.dateOfIssue!, "dd MMM yyyy");
        appointments[date] = appointments[date]
          ? [...appointments[date], appointment]
          : [appointment];
        return appointments;
      }, {} as { [key: string]: Appointment[] })
    );
  }

  loadAppointments = async () => {
    const { getUser } = store.userStore;
    getUser();
    const { user } = store.userStore;

    this.setLoadingInitial(true);
    try {
      
      const appointments = await agent.Appointments.list(user!.appUserId);

      appointments.forEach((appointment) => {
        this.setAppointment(appointment);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);

      this.setLoadingInitial(false);
    }
  };

  loadAppointment = async (id: string) => {
    let appointment = this.getAppointment(id);
    if (appointment) {
      this.selectedAppointment = appointment;
      return appointment;
    } else {
      this.setLoadingInitial(true);
      try {
        appointment = await agent.Appointments.details(id);
        this.setAppointment(appointment);
        runInAction(() => {
          this.selectedAppointment = appointment;
        });

        this.setLoadingInitial(false);
        return appointment;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setAppointment = (appointment: Appointment) => {
    const user = store.userStore.user;
    
    if (user) {
      appointment.isGoing = appointment.attendees!.some(
        (a) => a.username === user.username
      );
      appointment.isDoctor = appointment.doctorUsername === user.username;
      
      appointment.doctorUserProfile = appointment.attendees?.find(
        x => x.username === appointment.doctorUsername);
      // appointment.doctor = appointment.attendees?.find(
      //   (x) => x.username === appointment.doctorUsername
      // );
    }
    appointment.dateOfIssue = new Date(appointment.dateOfIssue!);
    this.appointmentRegistry.set(appointment.id, appointment);
  };

  private getAppointment = (id: string) => {
    return this.appointmentRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createAppointment = async (appointment: AppointmentFormValues) => {
    const user = store.userStore.user;
    const profile = new Profile(user!);
    
    
    try {
      console.log(appointment);
      await agent.Appointments.create(appointment);

      
      
      const newAppointment = new Appointment(appointment);
      newAppointment.doctorUsername = user!.username;
      newAppointment.attendees = [profile];
      
      
      this.setAppointment(newAppointment);
      runInAction(() => {
        this.selectedAppointment = newAppointment;
      });
      
      
    } catch (error) {
      console.log(error);
    }
  };
  updateAppointment = async (appointment: AppointmentFormValues) => {
    try {
      console.log(appointment);
      await agent.Appointments.update(appointment);
      runInAction(() => {
        if (appointment.id) {
          let updatedAppointment = {
            ...this.getAppointment(appointment.id),
            ...appointment,
          };
          this.appointmentRegistry.set(
            appointment.id,
            updatedAppointment as Appointment
          );
          this.selectedAppointment = updatedAppointment as Appointment;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  deleteAppointment = async (id: string) => {
    this.loading = true;
    try {
      await agent.Appointments.delete(id);
      runInAction(() => {
        this.appointmentRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateAttendance = async (userId: string) => { //id: string
    const user = store.userStore.patients.find((x) => x.appUserId === userId); 
    
    
    this.loading = true;
    try {
      await agent.Appointments.attend(this.selectedAppointment!.id);
      runInAction(() => {
        if (this.selectedAppointment?.attendees.length !== 2) {
          if (this.selectedAppointment?.isGoing) {
          this.selectedAppointment.attendees =
          this.selectedAppointment.attendees?.filter(
              (a) => a.username !== user?.username
            );
          this.selectedAppointment.isGoing = false;
        } else {
          const attendee = new Profile(user!);
          
          this.selectedAppointment?.attendees?.push(attendee);
          this.selectedAppointment!.isGoing = true;
        }
        }
        
      });
      this.appointmentRegistry.set(
        this.selectedAppointment!.id,
        this.selectedAppointment!
      );
      
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  cancelAppointmentToggle = async () => {
    this.loading = true;
    try {
      await agent.Appointments.attend(this.selectedAppointment!.id);
      runInAction(() => {
        this.selectedAppointment!.isCancelled =
          !this.selectedAppointment!.isCancelled;
        this.appointmentRegistry.set(
          this.selectedAppointment!.id,
          this.selectedAppointment!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  
  }

