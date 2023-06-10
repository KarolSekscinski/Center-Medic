import { Profile } from "./profile";

export interface Prescription {
    id: string;
    dateOfIssue: Date | null;
    description: string;
    status: boolean;
    doctorUsername: string;
    attendees: Profile[];
    validUntil: Date | null;
    doctor?: Profile;
    isDoctor: boolean;
}

export class Prescription implements Prescription {
    constructor(init?: PrescriptionFormValues) {
        Object.assign(this, init);
    }

}

export class PrescriptionFormValues {
    id?: string = undefined;
    description: string = '';
    dateOfIssue: Date | null = null;
    validUntil: Date | null = null;
    constructor(prescription?: PrescriptionFormValues) {
        if (prescription) {
            this.id = prescription.id;
            this.description = prescription.description;
            this.dateOfIssue = prescription.dateOfIssue;
            
            this.validUntil = prescription.validUntil;
        }
    }
}