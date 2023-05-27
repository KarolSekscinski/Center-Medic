import React from "react";
import { Grid } from "semantic-ui-react";
import AppointmentList from "./AppointmentList";
import AppointmentDetails from "../details/AppointmentDetails";
import AppointmentForm from "../form/AppointmentForm";

interface Props {
  appointments: Appointment[];
  selectedAppointment: Appointment | undefined;
  selectAppointment: (id: string) => void;
  cancelSelectAppointment: () => void;
  editMode: boolean;
  openForm:(id: string) => void;
  closeForm: () => void;
  createOrEdit: (appointment: Appointment) => void;
  deleteAppointment: (id: string) => void;
  submitting: boolean;
}

export default function AppointmentDashBoard({
  appointments,
  selectedAppointment,
  selectAppointment,
  cancelSelectAppointment,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteAppointment,
  submitting,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <AppointmentList
          appointments={appointments}
          selectAppointment={selectAppointment}
          deleteAppointment={deleteAppointment}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedAppointment && !editMode && (
          <AppointmentDetails appointment={selectedAppointment} cancelSelectAppointment={cancelSelectAppointment} openForm={openForm} />
        )}
        {editMode && <AppointmentForm closeForm={closeForm} appointment={selectedAppointment} createOrEdit={createOrEdit} submitting={submitting} />}
        
      </Grid.Column>
    </Grid>
  );
}
