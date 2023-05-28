import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";


const appointmentImageStyle = {
    filter: 'brightness(30%)'
};

const appointmentImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  appointment: Appointment;
}

export default observer(function ActivityDetailedHeader({
  appointment,
}: Props) {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
      <Image src={`/assets/categoryImages/gabinet.jpg`} fluid style={appointmentImageStyle}/>
        <Segment style={appointmentImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={`Wizyta`}
                  style={{ color: "white" }}
                />
                <p>{appointment.dateOfIssue}</p>
                <p>
                  {`Lekarz: ${appointment.doctorId}`}
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Join Activity</Button>
        <Button>Odwołaj wizytę</Button>
        <Button color="orange" floated="right">
          Zarządzaj wizytą
        </Button>
      </Segment>
    </Segment.Group>
  );
});
