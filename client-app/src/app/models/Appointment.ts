import { Profile } from "./profile";
export interface Appointment {
    id: string;
    dateOfIssue: Date | null;
    description: string;
    status: string;
    doctorUsername: string;
    attendees: Profile[];
    isCancelled: boolean;
    isDone: boolean;
    isGoing: boolean;
    isDoctor: boolean;
    doctor: string;
    patient: string;
    doctorUserProfile?: Profile;

  }
  export class Appointment implements Appointment {
    constructor(init?: AppointmentFormValues) {
      Object.assign(this, init);
    }

  }

  export class AppointmentFormValues {
    id?: string = undefined;
    description: string = '';
    dateOfIssue: Date | null = null;
    doctor: string = '';
    patient: string = '';
    attendees: Profile[] = [];
    constructor(appointment?: AppointmentFormValues) {
      if (appointment) {
        this.id = appointment.id;
        this.description = appointment.description;
        this.dateOfIssue = appointment.dateOfIssue;
        this.doctor = appointment.doctor;
        this.attendees = appointment.attendees;
        this.patient = appointment.patient;
      }
    }
  }