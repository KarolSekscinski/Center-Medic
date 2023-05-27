import React, { useEffect, useState } from "react";

import axios from "axios";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import AppointmentDashBoard from "../../features/appointments/dashboard/AppointmentDashBoard";
import {v4 as uuid} from 'uuid';

function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<
    Appointment | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Appointment[]>("http://localhost:5000/api/appointments")
      .then((response) => {
        setAppointments(response.data);
      });
  }, []);

  function handleSelectAppointment(id: string) {
    setSelectedAppointment(appointments.find((x) => x.id === id));
  }

  function handleCancelSelectAppointment() {
    setSelectedAppointment(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectAppointment(id) : handleCancelSelectAppointment();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditAppointment(appointment: Appointment) {
    appointment.id
      ? setAppointments([
          ...appointments.filter((x) => x.id !== appointment.id),
          appointment,
        ])
      : setAppointments([...appointments, {...appointment, id: uuid()}]);
      setEditMode(false);
      setSelectedAppointment(appointment);
  }

  function handleDeleteAppointment(id: string) {
    setAppointments([...appointments.filter(x => x.id !== id)]);
  }
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <AppointmentDashBoard
          appointments={appointments}
          selectedAppointment={selectedAppointment}
          selectAppointment={handleSelectAppointment}
          cancelSelectAppointment={handleCancelSelectAppointment}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditAppointment}
          deleteAppointment={handleDeleteAppointment}
        />
      </Container>
    </>
  );
}

export default App;
