import React, { useEffect, useState } from "react";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { AppointmentFormValues } from "../../../app/models/appointment";
import DoctorsSelectInput from "../../../app/common/form/DoctorsSelectInput";
import PatientsSelectInput from "../../../app/common/form/PatientsSelectInput";



export default observer(function AppointmentForm() {
  const { appointmentStore } = useStore();
  const { userStore: { user } } = useStore();
  const {
    createAppointment,
    updateAppointment,
    loading,
    loadAppointment,
    loadingInitial,
    updateAttendance,
  } = appointmentStore;

  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState<AppointmentFormValues>(new AppointmentFormValues());

  const validationSchema = Yup.object({
    description: Yup.string().required("Opis wizyty jest wymagany."),
    dateOfIssue: Yup.string().required("Data wizyty jest wymagana."),
    
    
    
  });
  useEffect(() => {
    if (id)
      loadAppointment(id).then((appointment) => setAppointment(new AppointmentFormValues(appointment)));
  }, [id, loadAppointment]);

  function handleFormSubmit(appointment: AppointmentFormValues) {
    console.log(appointment);
    if (!appointment.id) {
      let newAppointment = {
        ...appointment,
        id: uuid(),
        
      };
      console.log(newAppointment);
      createAppointment(newAppointment).then(() => 
         navigate(`/appointments/${newAppointment.id}`));

        
    
    
      
    } else {
      updateAppointment(appointment).then(() => 
        
         navigate(`/appointments/${appointment.id}`)
        );
    }
    

  }

 

  if (loadingInitial)
    return <LoadingComponent content="Loading appointment..." />;

  return (
    <Segment clearing>
      <Header size="huge" content="Szczegóły wizyty" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={appointment}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Header size="small" color="teal" content="Opis wizyty" />
            <MyTextArea rows={3} name="description" placeholder="Opis wizyty" />
            {/* <Header size="small" color="teal" content="Lekarz:" />
            <DoctorsSelectInput  /> */}
            {/* <Header size="small" color="teal" content="Pacjent:" />
            <PatientsSelectInput /> */}
            {/* <MySelectInput options={patientsOptions} placeholder="Pacjent" name="patient" /> */}
            
            <Header content="Termin wizyty" sub color="teal" />
            <MyDateInput
              placeholderText="Data wizyty"
              name="dateOfIssue"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated="right"
              positive
              type="submit"
              content="Potwierdź"
            />
            <Button
              as={Link}
              to={`/appointments/user/${user?.appUserId}`}
              floated="right"
              type="button"
              content="Anuluj"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
