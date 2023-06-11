import { useEffect, useState } from "react";
import { DropdownItemProps } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { User } from "../../models/user";
import MySelectInput from "./MySelectInput";


export default function PatientsSelectInput() {
    const [patientsOptions, setPatients] = useState<DropdownItemProps[]>([]);
    const {
        userStore: { patients, getPatients },
    } = useStore();

    const getPatientsFromApi = () => {
        try {
            getPatients();
            const patientsData: User[] = patients;
            const dropdownItems: DropdownItemProps[] = patientsData.map(
                (patient: User) => {
                    return {
                        key: patient.appUserId,
                        text: patient.displayName,
                        value: patient.appUserId,
                    };
                }
            );
            setPatients(dropdownItems);
            console.log(patientsOptions);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (patientsOptions.length === 0)
            getPatientsFromApi();
    }, [patients]);

    return <MySelectInput placeholder="Pacjent" name="patient" options={patientsOptions} />;
}