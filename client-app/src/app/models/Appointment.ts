interface Appointment {
    id: string;
    patiendId: number;
    doctorId: number;
    dateOfIssue: Date | null;
    description: string;
  }