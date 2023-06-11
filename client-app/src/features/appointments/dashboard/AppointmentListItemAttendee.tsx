import { observer } from "mobx-react-lite";
import React from "react";
import { List, Image, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import { Link } from "react-router-dom";
import ProfileCard from "../../profiles/ProfileCard";
import { useStore } from "../../../app/stores/store";

interface Props {
  attendees: Profile[];
}

export default observer(function AppointmentListItemAttendee({
  attendees,
}: Props) {
  
  
  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <Popup
          hoverable
          key={attendee.displayName}
          
          trigger={
            <List.Item
              key={attendee.displayName}
              as={Link}
              to={`/profiles/${attendee.displayName}`}
            >
              <Image
                size="mini"
                circular
                src={attendee.image || "/assets/user.png"}
              />
            </List.Item>
          }
        >
          {/* <Popup.Content>
            <ProfileCard profile={attendee} />
          </Popup.Content> */}
        </Popup>
      ))}
    </List>
  );
});
