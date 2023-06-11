import {
  Button,
  Icon,
  Item,
  Label,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import { Prescription } from "../../../app/models/prescription";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import App from "../../../app/layout/App";
import { Appointment } from "../../../app/models/appointment";
import AppointmentListItemAttendee from "../../appointments/dashboard/AppointmentListItemAttendee";
import UserStore from "../../../app/stores/userStore";
import { useStore } from "../../../app/stores/store";

interface Props {
  prescription: Prescription;
}

export default function PrescriptionListItem({ prescription }: Props) {
  const { userStore } = useStore();
  const { user } = userStore;
  const doctor = prescription.doctor?.displayName;

  if (doctor === user?.name) {
    console.log(doctor);
    console.log("jestem lekarzem");
  }
  return (
    <SegmentGroup>
      <Segment>
        {prescription && (
          <Label
            attached="top"
            color={prescription.status ? "orange" : "grey"}
            content={
              prescription.status ? "W trakcie realizacji" : "Zrealizowana"
            }
          ></Label>
        )}
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 3 }}
              size="tiny"
              circular
              src="/assets/lekarz-ikona.png"
            />
            <Item.Content>
              <Item.Header as={Link} to={`/prescriptions/${prescription.id}`}>
                {`Recepta`}
              </Item.Header>
              <Item.Description>{`Lekarz: ${prescription.doctor?.displayName}`}</Item.Description>
              {prescription.isDoctor && (
                <Item.Description>
                  <Label basic color="orange">
                    Ty jesteś lekarzem
                  </Label>
                </Item.Description>
              )}
              {!prescription.isDoctor && (
                <Item.Description>
                  <Label basic color="green">
                    Ty jesteś pacjentem
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />{" "}
          {format(prescription.dateOfIssue!, "dd MMM yyyy h:mm aa")}{" "}
          <Icon name="marker" /> Do odbioru w aptece: {`Adres apteki`}
        </span>
      </Segment>

      <Segment clearing>
        <span>{prescription.description}</span>
        <Button
          as={Link}
          to={`/prescriptions/${prescription.id}`}
          floated="right"
          color="teal"
          content="Zobacz szczegóły recepty"
        />
      </Segment>
    </SegmentGroup>
  );
}
