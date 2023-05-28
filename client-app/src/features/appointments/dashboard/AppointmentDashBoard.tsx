import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import AppointmentList from "./AppointmentList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";



export default observer(function AppointmentDashBoard() {
  const { appointmentStore } = useStore();
  const {loadAppointments, appointmentRegistry} = appointmentStore;

  useEffect(() => {
    if (appointmentRegistry.size <= 1) loadAppointments();
  }, [loadAppointments, appointmentRegistry.size]);

  if (appointmentStore.loadingInitial) {
    return <LoadingComponent content="Loading app..." />;
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <AppointmentList />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Filtry wizyt</h2>
      </Grid.Column>
    </Grid>
  );
}) 
