import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Alert,
  Container,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";

import { config } from "../config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [appErrors, setAppErrors] = useState(null);
  const [refreshToken, setRefreshToken] = useLocalStorage({
    key: "refresh_token",
  });
  const [saveTokens, setSaveTokens] = useLocalStorage({ key: "auth" });
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleLogin = (values) => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const raw = JSON.stringify(values);
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: raw,
      redirect: "follow",
    };

    fetch(`${config.v1}/user/login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          setAppErrors(result.error);
          return;
        } else {
          setSaveTokens(result);
          setAppErrors(null);
          navigate("/", { replace: true });
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor
            href="/join"
            size="sm"
            onClick={(event) => event.preventDefault()}
          >
            Create account
          </Anchor>
        </Text>
        <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              {...form.getInputProps("password")}
            />
            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>

            <br />

            {appErrors ? (
              <>
                <Alert title={appErrors} color="red">
                  {" "}
                </Alert>
              </>
            ) : (
              <></>
            )}
          </Paper>
        </form>
      </Container>
    </>
  );
}
