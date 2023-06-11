import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default function NotFound() {
    const user = useStore().userStore.user;
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search" />
                Szukaliśmy wszędzie ale nie znaleźliśmy tego czego szukasz.
            </Header>
            <Segment.Inline>
                <Button as={Link} to={`/appointments/user/${user?.appUserId}`} >
                    Wróć do wizyt.
                </Button>
                <Button as={Link} to={`/prescriptions/user/${user?.appUserId}`}>
                    Wróć do recept.
                </Button>
            </Segment.Inline>
        </Segment>
    )
}