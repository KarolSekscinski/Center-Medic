import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import AppointmentListItem from "./AppointmentListItem";

export default observer(function AppointmentList() {
  const { appointmentStore } = useStore();
  const { groupedAppointments } = appointmentStore;

  return (
    <>
      {groupedAppointments.map(([group, appointments]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          
              {appointments.map((appointment) => (
                <AppointmentListItem
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            
        </Fragment>
      ))}
    </>
  );
});
