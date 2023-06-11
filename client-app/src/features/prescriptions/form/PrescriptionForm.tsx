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
        
        doctor: Yup.string().required("Nazwa lekarza jest wymagana."),
        patient: Yup.string().required("Nazwa pacjenta jest wymagana."),
    });

    useEffect(() => {
        if(id) loadPrescription(id).then(prescription => setPrescription(new PrescriptionFormValues(prescription)));
    }, [id, loadPrescription]);

    function handleFormSubmit(prescription: PrescriptionFormValues) {
        if(!prescription.id) {
            let newPrescription = {
                ...prescription,
                id: uuid(),
                
            };
            createPrescription(newPrescription).then(() => navigate(`/prescriptions/${newPrescription.id}`));
        } else {
            updatePrescription(prescription).then(() => navigate(`/prescriptions/${prescription.id}`));
        }
    }

    if (loadingInitial) 
        return <LoadingComponent content="Ładowanie recepty..." />
        
    return (
        <Segment clearing>
            <Header content="Szczegoly recepty" sub color="teal" />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={prescription}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        
                        <MyTextArea rows={3} name='description' placeholder='Opis' />
                        <MyDateInput name='dateOfIssue' placeholderText='Data wystawienia' showTimeSelect timeCaption="time" dateFormat="MMMM d, yyyy h:mm aa" />
                        <MyDateInput name='expirationDate' placeholderText='Data ważności' showTimeSelect timeCaption="time" dateFormat="MMMM d, yyyy h:mm aa" />
                        
                        <MyTextInput name='doctor' placeholder='Lekarz' />
                        <MyTextInput name='patient' placeholder='Pacjent' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            floated='right'
                            positive type='submit' content='Submit' />
                        <Button as={Link} to={`/prescriptions/user/${user?.appUserId}`} floated='right' type='button' content='Cancel' />
                    </Form>

                )}
            </Formik>
        </Segment>
    )





    


});