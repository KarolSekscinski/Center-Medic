import React, { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function AppointmentForm() {
  const { appointmentStore } = useStore();
  const {
    createAppointment,
    updateAppointment,
    loading,
    loadAppointment,
    loadingInitial,
  } = appointmentStore;

  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState<Appointment>({
    id: "",
    description: "",
    patiendId: 0,
    doctorId: 0,
    dateOfIssue: null,
  });

  const validationSchema = Yup.object({
    description: Yup.string().required("Opis wizyty jest wymagany."),
    dateOfIssue: Yup.string().required("Data wizyty jest wymagana."),
  });
  useEffect(() => {
    if (id)
      loadAppointment(id).then((appointment) => setAppointment(appointment!));
  }, [id, loadAppointment]);

  function handleFormSubmit(appointment: Appointment) {
    if (!appointment.id) {
      appointment.id = uuid();
      createAppointment(appointment).then(() => navigate(`/appointments/${appointment.id}`));
    } else {
      updateAppointment(appointment).then(() => navigate(`/appointments/${appointment.id}`));
    }

  }

 

  if (loadingInitial)
    return <LoadingComponent content="Loading appointment..." />;

  return (
    <Segment clearing>
      <Header content="Szczegóły wizyty" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={appointment}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextArea rows={3} name="description" placeholder="Opis wizyty" />

            <MyDateInput
              placeholderText="Data wizyty"
              name="dateOfIssue"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Zatwierdź"
            />
            <Button
              as={Link}
              to="/appointments"
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
