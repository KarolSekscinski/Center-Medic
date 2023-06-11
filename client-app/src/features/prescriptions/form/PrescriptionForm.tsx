import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PrescriptionFormValues } from "../../../app/models/prescription";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Button, Header, Segment } from "semantic-ui-react";
import { Form, Formik } from "formik";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import UserStore from "../../../app/stores/userStore";
import DoctorsSelectInput from "../../../app/common/form/DoctorsSelectInput";
import PatientsSelectInput from "../../../app/common/form/PatientsSelectInput";

export default observer(function PrescriptionForm() {
    const {prescriptionStore} = useStore();
    const {userStore: {user}} = useStore();
    const {createPrescription, updatePrescription, loading, loadPrescription, loadingInitial} = prescriptionStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [prescription, setPrescription] = useState<PrescriptionFormValues>(new PrescriptionFormValues());
    const validationSchema = Yup.object({
        description: Yup.string().required("Opis recepty jest wymagany."),
        dateOfIssue: Yup.string().required("Data wystawienia recepty jest wymagana."),
        expirationDate: Yup.string().required("Data ważności recepty jest wymagana."),
        
        patient: Yup.string().required("Wybranie pacjenta jest wymagane."),
        doctor: Yup.string().required("Wybranie lekarza jest wymagane."),
    });

    useEffect(() => {
        if(id) loadPrescription(id).then(prescription => setPrescription(new PrescriptionFormValues(prescription)));
    }, [id, loadPrescription]);

    function handleFormSubmit(prescription: PrescriptionFormValues) {
        if(!prescription.id) {
            console.log(prescription);
            let newPrescription = {
                ...prescription,
                id: uuid(),
                doctor: prescription.doctor,
                patient: prescription.patient,
                
                
            };
            console.log(newPrescription);
            createPrescription(newPrescription).then(() => navigate(`/prescriptions/${newPrescription.id}`));
        } else {
            updatePrescription(prescription).then(() => navigate(`/prescriptions/${prescription.id}`));
        }
    }

    if (loadingInitial) 
        return <LoadingComponent content="Ładowanie recepty..." />
        
    return (
        <Segment clearing>
            <Header size="huge" content="Szczegóły recepty" sub color="teal" />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={prescription}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header size="small" color="teal" content="Opis recepty" />
                        <MyTextArea rows={3} name='description' placeholder='Opis' />
                        <Header size="small" color="teal" content="Data wystawienia" />
                        <MyDateInput name='dateOfIssue' placeholderText='Data wystawienia' showTimeSelect timeCaption="time" dateFormat="MMMM d, yyyy h:mm aa" />
                        <Header size="small" color="teal" content="Data ważności" />
                        <MyDateInput name='expirationDate' placeholderText='Data ważności' showTimeSelect timeCaption="time" dateFormat="MMMM d, yyyy h:mm aa" />
                        <Header size="small" color="teal" content="Lekarz:" />
                        <DoctorsSelectInput />
                        <Header size="small" color="teal" content="Pacjent:" />
                        <PatientsSelectInput />
                        
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            floated='right'
                            positive type='submit' content='Potwierdź' />
                        <Button as={Link} to={`/prescriptions/user/${user?.appUserId}`} floated='right' type='button' content='Anuluj' />
                    </Form>

                )}
            </Formik>
        </Segment>
    )





    


});