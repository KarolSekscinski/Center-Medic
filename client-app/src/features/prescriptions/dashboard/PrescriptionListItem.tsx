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
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";

interface Props {
  prescription: Prescription;
}

export default function PrescriptionListItem({ prescription }: Props) {
  
  const {userStore: {user} } = useStore();
  const [isDoctor, setIsDoctor] = useState(false);
  prescription.isDoctor = isDoctor;
  const doctor = prescription.doctorUserProfile?.displayName;
  const nr = prescription.id.split('-')[0].toLowerCase();
  useEffect(() => {
    if (prescription.doctorUserProfile?.displayName === user?.displayName) {
      console.log("jestem lekarzem");
      setIsDoctor(true);
    }
  }, [prescription.doctorUserProfile?.displayName, user?.displayName]);

  
  
  return (
    <SegmentGroup>
      <Segment>
        {!prescription.isCancelled && (
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
              style={{ marginBottom: 5 }}
              size="tiny"
              circular
              src="/assets/lekarz-ikona.png"
            />
            <Item.Content>
              <Item.Header as={Link} to={`/prescriptions/${prescription.id}`}>
                {`Recepta nr ${nr} z dnia ${format(
                  prescription.dateOfIssue!,  "dd MMM yyyy")}`}
              </Item.Header>
              <Item.Description>{`Lekarz: ${prescription.doctorUserProfile?.displayName}`}</Item.Description>
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
