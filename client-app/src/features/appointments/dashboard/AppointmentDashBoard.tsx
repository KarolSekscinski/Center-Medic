import React from "react";
import { Grid } from "semantic-ui-react";
import AppointmentList from "./AppointmentList";
import AppointmentDetails from "../details/AppointmentDetails";
import AppointmentForm from "../form/AppointmentForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";



export default observer(function AppointmentDashBoard() {
  const { appointmentStore } = useStore();
  const { selectedAppointment, editMode } = appointmentStore;
  return (
    <Grid>
      <Grid.Column width="10">
        <AppointmentList />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedAppointment && !editMode && <AppointmentDetails />}
        {editMode && (
          <AppointmentForm />
        )}
      </Grid.Column>
    </Grid>
  );
}) 
