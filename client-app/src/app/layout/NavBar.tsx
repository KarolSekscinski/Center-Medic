import React from "react";
import { Button, Container, Menu, Image, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
  const {
    userStore: { user, logout, getUser },
  } = useStore();
  
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
        <Menu.Item name="Wizyty" as={NavLink} to={`/appointments/user/${user?.appUserId}`} />
        {user?.isDoctor === 'true' && (
          <Menu.Item as={NavLink} to="/createAppointment">
            <Button positive content="Zaplanuj wizytę" />
          </Menu.Item>)}
        
        <Menu.Item as={NavLink} to={`/prescriptions/user/${user?.appUserId}`} name="Recepty" />
        {user?.isDoctor === 'true' && (
          <Menu.Item as={NavLink} to="/createPrescription">
            <Button positive content="Wystaw receptę" />
          </Menu.Item>
        )}

        <Menu.Item position="right">
          <Image
            src={user?.image || "/assets/user.png"}
            avatar
            spaced="right"
          />
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profile/${user?.username}`}
                text="Mój profil"
                icon="user"
              />
              <Dropdown.Item onClick={logout} text="Wyloguj" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
});
