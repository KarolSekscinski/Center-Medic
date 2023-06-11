import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import PatientsSelectInput from "../../../app/common/form/PatientsSelectInput";


export default observer(function PatientForm() {
    const validationSchema = Yup.object({
        patient: Yup.string().required("Wybranie pacjenta jest wymagane."),
    });

    return (
        <h1>Formularz pacjenta</h1>
    )

});