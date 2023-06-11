import { makeAutoObservable, runInAction } from "mobx";
import { Prescription, PrescriptionFormValues } from "../models/prescription";
import { format } from "date-fns";
import { store } from "./store";
import agent from "../api/agent";
import { Profile } from "../models/profile";


export default class PrescriptionStore {
    prescriptionRegistry = new Map<string, Prescription>();
    selectedPrescription: Prescription | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }
    get prescriptionsByDate() {
        return Array.from(this.prescriptionRegistry.values()).sort(
            (a, b) => a.dateOfIssue!.getTime() - b.dateOfIssue!.getTime()
        );
    }

    get groupedPrescriptions() {
        return Object.entries(this.prescriptionsByDate.reduce((prescriptions, prescription) => {
            const date = format(prescription.dateOfIssue!, 'dd MMM yyyy');
            prescriptions[date] = prescriptions[date] ? [...prescriptions[date], prescription] : [prescription];
            return prescriptions;
        }, {} as { [key: string]: Prescription[] }))
    }

    loadPrescriptions = async () => {
        this.setLoadingInitial(true);
        try {
            const prescriptions = await agent.Prescriptions.list();

            prescriptions.forEach((prescription) => {
                this.setPrescription(prescription);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);

            this.setLoadingInitial(false);
        }
    }

    loadPrescription = async (id: string) => {
        let prescription = this.getPrescription(id);
        if (prescription) {
            this.selectedPrescription = prescription;
            return prescription;
        }
        else {
            this.setLoadingInitial(true);
            try {
                prescription = await agent.Prescriptions.details(id);
                this.setPrescription(prescription);
                runInAction(() => {
                    this.selectedPrescription = prescription;
                })

                this.setLoadingInitial(false);
                return prescription;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setPrescription = (prescription: Prescription) => {
        const user = store.userStore.user;
        if (user) {
            prescription.isDoctor = prescription.doctorUsername === user.username;
            prescription.doctor = prescription.attendees?.find(
                a => a.username === prescription.doctorUsername
            );
        }
        prescription.dateOfIssue = new Date(prescription.dateOfIssue!);
        this.prescriptionRegistry.set(prescription.id, prescription);
    }

    private getPrescription = (id: string) => {
        return this.prescriptionRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createPrescription = async (prescription: PrescriptionFormValues) => {
        const user = store.userStore.user;
        const attendee = new Profile(user!);
        try {
            await agent.Prescriptions.create(prescription);
            const newPrescription = new Prescription(prescription);
            newPrescription.attendees = [attendee];
            newPrescription.isDoctor = true;
            this.setPrescription(newPrescription);
            runInAction(() => {
                this.selectedPrescription = newPrescription;
            })
        } catch (error) {
            console.log(error);
        }
    }

    updatePrescription = async (prescription: PrescriptionFormValues) => {
        try {
            await agent.Prescriptions.update(prescription);
            runInAction(() => {
                if (prescription.id) {
                    let updatedPrescription = { ...this.getPrescription(prescription.id), ...prescription }
                    this.prescriptionRegistry.set(prescription.id, updatedPrescription as Prescription);
                    this.selectedPrescription = updatedPrescription as Prescription;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    deletePrescription = async (id: string) => {
        this.loading = true;
        try {
            await agent.Prescriptions.delete(id);
            runInAction(() => {
                this.prescriptionRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateAttendance = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.Prescriptions.attend(this.selectedPrescription!.id);
            runInAction(() => {
                if (this.selectedPrescription?.isDoctor) {
                    this.selectedPrescription.attendees = this.selectedPrescription.attendees?.filter(
                        a => a.username !== user?.username
                    )
                    this.selectedPrescription.isDoctor = false;
                } else {
                    const attendee = new Profile(user!);
                    this.selectedPrescription?.attendees?.push(attendee);
                    this.selectedPrescription!.isDoctor = true;
                }
                this.prescriptionRegistry.set(this.selectedPrescription!.id, this.selectedPrescription!);
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    cancelPrescriptionToggle = async () => {
        this.loading = true;
        try {
            await agent.Prescriptions.attend(this.selectedPrescription!.id);
            runInAction(() => {
                this.selectedPrescription!.status = !this.selectedPrescription?.status;
                this.prescriptionRegistry.set(this.selectedPrescription!.id, this.selectedPrescription!);
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}
