import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function NavBar() {
  const { appointmentStore } = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Medic Center
        </Menu.Item>
        <Menu.Item name="Wizyty" />
        <Menu.Item>
          <Button
            onClick={() => appointmentStore.openForm()}
            positive
            content="Zaplanuj wizytę"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
});
