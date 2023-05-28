import React, { useEffect } from "react";
import { Grid} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import AppointmentDetailedHeader from "./AppointmentDetailedHeader";
import AppointmentDetailedInfo from "./AppointmentDetailedInfo";
import AppointmentDetailedSidebar from "./AppointmentDetailedSidebar";



export default observer(function AppointmentDetails() {

  const {appointmentStore} = useStore();
  const {selectedAppointment: appointment, loadAppointment, loadingInitial} = appointmentStore;
  const {id} = useParams();

  useEffect(() => {
    if (id) loadAppointment(id); 
  },[id, loadAppointment])

  if (loadingInitial || !appointment) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <AppointmentDetailedHeader appointment={appointment} />
        <AppointmentDetailedInfo appointment={appointment} />

      </Grid.Column>
      {/* <Grid.Column width={6} >
        <AppointmentDetailedSidebar />
      </Grid.Column> */}
    </Grid>
  );
}) 
