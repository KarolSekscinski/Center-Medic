import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as='h1' inverted >
          <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
          Center Medic
        </Header>
        <Header as='h2' inverted content='Witaj w naszej przychodni' />
        <Button as={Link} to='/appointments' size="huge" inverted >Wizyty</Button>
      </Container>
    </Segment>
  );
}
