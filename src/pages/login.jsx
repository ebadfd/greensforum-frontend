import { LoginForm } from "../components/Login/login";

import { Container } from "@mantine/core";

export default function Login() {
  return (
    <>
      <Container size={420} my={40}>
        <LoginForm />
      </Container>
    </>
  );
}
