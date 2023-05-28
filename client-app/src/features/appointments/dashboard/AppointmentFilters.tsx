import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function AppointmentFilters() {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: '30' }}>
        <Header icon="filter" attached color="teal" content="Filtruj" />
        <Menu.Item content="Wszystkie wizyty" />
        <Menu.Item content="Odbyte wizyty" />
        <Menu.Item content="Przyszłe wizyty" />
      </Menu>
      <Header />
      <Calendar />
    </>
  );
}
