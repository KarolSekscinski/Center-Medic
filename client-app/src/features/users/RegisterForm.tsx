import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationError from "../errors/ValidationError";
import MySelectInput from "../../app/common/form/MySelectInput";
import { sexOptions } from "../../app/common/options/sexOptions";
import MyDateInput from "../../app/common/form/MyDateInput";

export default observer(function RegisterForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        name: "",
        surname: "",
        pesel: "",
        phoneNumber: "",
        sex: "",
        dateOfBirth: new Date(),
        isDoctor: false,
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .register(values)
          .catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required("Nazwa użytkownika jest wymagana."),
        username: Yup.string().required("Nazwa użytkownika jest wymagana."),
        email: Yup.string().required().email("Emailjest wymagany."),
        password: Yup.string().required("Hasło jest wymagane."),
        name: Yup.string().required("Imię jest wymagane."),
        surname: Yup.string().required("Nazwisko jest wymagane."),
        pesel: Yup.string().required("Pesel jest wymagany."),
        phoneNumber: Yup.string().required("Numer telefonu jest wymagany."),
        sex: Yup.string().required("Płeć jest wymagana."),
        dateOfBirth: Yup.string().required("Data urodzenia jest wymagana."),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Zarejestruj się do Center Medic"
            color="teal"
            textAlign="center"
          />
          <MyTextInput name="email" placeholder="Email" />
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextInput name="username" placeholder="Username" />
          <MyTextInput name="name" placeholder="Imię" />
          <MyTextInput name="surname" placeholder="Nazwisko" />
          <MyTextInput name="pesel" placeholder="Pesel" />
          <MyTextInput name="phoneNumber" placeholder="Numer telefonu" />
          <MySelectInput options={sexOptions} name="sex" placeholder="płeć" />
          <MyDateInput name='date' placeholderText='Data urodzenia'  timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />
          <MyTextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <ValidationError errors={errors.error}
              />
            )}
          />
          <Button
          disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Zarejestruj się"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
});
