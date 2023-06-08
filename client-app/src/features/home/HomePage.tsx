import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo1.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Center Medic
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Witaj w naszej przychodni" />
            <Button as={Link} to="/appointments" size="huge" inverted>
              Przejdź do wizyt
            </Button>
          </>
        ) : (
          <>
            <Header as="h2" inverted content="Witaj w naszej przychodni" />
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              Zaloguj się
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size="huge"
              inverted
            >
              Zarejestruj się
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
});
