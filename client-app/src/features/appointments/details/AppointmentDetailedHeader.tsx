import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Item, Segment, Image, Label, Form } from "semantic-ui-react";
import { Appointment } from "../../../app/models/appointment";
import { useStore } from "../../../app/stores/store";
import PatientsSelectInput from "../../../app/common/form/PatientsSelectInput";
import { Formik } from "formik";
import { tr } from "date-fns/locale";

const appointmentImageStyle = {
  filter: "brightness(30%)",
};

const appointmentImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  appointment: Appointment;
}

export default observer(function ActivityDetailedHeader({
  appointment,
}: Props) {
  const {
    appointmentStore: { updateAttendance, loading, cancelAppointmentToggle, deleteAppointment },
  } = useStore();
  const size = appointment.attendees.length;
  const [isDoctor, setIsDoctor] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const user = useStore().userStore.user;
  const patient = appointment.attendees.find(x => x.displayName !== appointment.doctorUserProfile?.displayName);
  console.log(patient);
  useEffect(() => {
    if (user?.isDoctor === "true") {
      setIsDoctor(true);
    }
  }, [user?.isDoctor]);

    const cancelAppointmentHandler = () => {
      setIsDisabled(true);
      appointment.isCancelled = true;
      cancelAppointmentToggle();
    };


   

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {appointment.isCancelled && (
          <Label
            style={{ position: "absolute", zIndex: 1000, left: -14, top: 20 }}
            ribbon
            color="red"
            content="Wizyta odwołana"
          />
        )}
        
        <Image
          src={`/assets/categoryImages/gabinet.jpg`}
          fluid
          style={appointmentImageStyle}
        />
        <Segment style={appointmentImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={`Wizyta`}
                  style={{ color: "white" }}
                />
                <p>{format(appointment.dateOfIssue!, "dd MMM yyyy")}</p>
                <p>
                  Lekarz: {"Dr. "}
                  <strong>
                    <Link to={`/profiles/${appointment.doctorUserProfile?.displayName}`}>
                      {appointment.doctorUserProfile?.displayName}
                    </Link>
                  </strong>
                  
                </p>
                <p>
                  Pacjent: {`${patient?.displayName}`}
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      {isDoctor && size !== 2 &&(
        
      <Segment basic style={{marginBottom: '3rem'}}>
        <span>
          <Formik enableReinitialize initialValues={appointment} onSubmit={(values) => {
            console.log(values);
            updateAttendance(values.patient)}}>
            {({ handleSubmit }) => (
              <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                <PatientsSelectInput  />
                <Button
                  loading={loading}
                  floated="right"
                  positive
                  type="submit"
                  content="Zapisz"
                />
              </Form>
            )}
          </Formik>
        </span>
      </Segment>)}
      <Segment clearing attached="bottom">
        {isDoctor ? (
          <>
            <Button
              color={appointment.isCancelled ? "green" : "red"}
              floated="left"
              basic
              content={
                appointment.isCancelled ? "Wznów wizytę" : "Odwołaj wizytę"
              }
              onClick={cancelAppointmentToggle}
              loading={loading}
            />
            <Button onClick={() => deleteAppointment(appointment.id)}  color="red" floated="left" as={Link} to={`/appointments/user/${user?.appUserId}`} >
              Usuń wizytę
            </Button>
            <Button
              disabled={appointment.isCancelled}
              as={Link}
              to={`/manageAppointment/${appointment.id}`}
              color="orange"
              floated="right"
            >
              Zarządzaj wizytą
            </Button>
          </>
        ) : appointment.isGoing ? (
          <Button loading={loading} onClick={cancelAppointmentHandler}  >
            Odwołaj wizytę
          </Button>
        ) : (
          <Button loading={loading}  color="red"  onClick={cancelAppointmentHandler} disabled={isDisabled}  >
            Odwołaj wizytę
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
});
