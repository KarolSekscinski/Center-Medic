import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search" />
                Szukaliśmy wszędzie ale nie znaleźliśmy tego czego szukasz.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/appointments' >
                    Wróć do wizyt.
                </Button>
            </Segment.Inline>
        </Segment>
    )
}