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
            <Button as={Link} to={`/appointments/user/${userStore.user?.appUserId}`} size="huge" inverted>
              Przejdź do swoich wizyt
            </Button>
            <Button as={Link} to={`/prescriptions/user/${userStore.user?.appUserId}`} size="huge" inverted>
              Przejdź do swoich recept
            </Button>
          </>
        ) : (
          <>
            <Header as="h2" inverted content="Witaj w naszej przychodni" />
            <Header
              as="h3"
              inverted
              content="Zaloguj się lub zarejestruj jako pacjent"
            />
            <Button
              style={{ margin:6 }}
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              Zaloguj się
            </Button>
            <Button
              style={{ margin: 6 }}
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size="huge"
              inverted
            >
              Zarejestruj się
            </Button>

            <Header as="h3" inverted content="Zaloguj się jako lekarz" />
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              Zaloguj się
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
});
