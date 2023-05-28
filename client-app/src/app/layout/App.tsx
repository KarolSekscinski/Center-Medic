import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import AppointmentDashBoard from "../../features/appointments/dashboard/AppointmentDashBoard";

import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { appointmentStore } = useStore();

  useEffect(() => {
    appointmentStore.loadAppointments();
  }, [appointmentStore]);

  if (appointmentStore.loadingInitial) {
    return <LoadingComponent content="Loading app..." />;
  }
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <AppointmentDashBoard />
      </Container>
    </>
  );
}

export default observer(App);
