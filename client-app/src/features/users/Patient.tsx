import { Button, Header, Image } from "semantic-ui-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useStore } from "../../app/stores/store";
import { Link } from "react-router-dom";

export default function Patient() {
  const { userStore, modalStore } = useStore();
  return (
    <>
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
    </>
  );
}
