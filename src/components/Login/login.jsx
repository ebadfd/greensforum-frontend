import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Alert,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";

import { config } from "../../config";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();

  const [appErrors, setAppErrors] = useState(null);
  const [saveTokens, setSaveTokens] = useLocalStorage({ key: "auth" });
  const [saveUser, setSaveUser] = useLocalStorage({ key: "user" });

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

          // save the user info on localstorage
          headers.append("Authorization", `Bearer ${result.auth_token}`);
          let r2 = {
            method: "GET",
            headers: headers,
            redirect: "follow",
          };

          fetch(`${config.v1}user/me`, r2)
            .then((result) => result.json())
            .then((data) => {
              if (data.error) {
                setAppErrors(data);
                return;
              } else {
                setSaveUser(data);
                console.log(saveUser);
              }
            });

          navigate("/", { replace: true });
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
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
          <Button fullWidth mt="xl" type="submit" color="green">
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
    </>
  );
}
