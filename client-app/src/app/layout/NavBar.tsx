import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

export default observer(function NavBar() {

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <img
            src="/assets/logo1.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Medic Center
        </Menu.Item>
        <Menu.Item name="Wizyty" as={NavLink} to="/appointments" />
        <Menu.Item name="Errors" as={NavLink} to="/errors" />
        <Menu.Item as={NavLink} to="/createAppointment">
          <Button
            positive
            content="Zaplanuj wizytę"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
});
