import React, { useState } from "react";
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Textarea,
  Title,
  Text,
  Anchor,
  Notification,
  ScrollArea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Check, X } from "tabler-icons-react";
import { config } from "../../config";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 300,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(/nsbm1.png)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 300,
    maxWidth: 800,
    paddingTop: 10,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "90%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export function RegisterForm() {
  const { classes } = useStyles();
  const [appErrors, setAppErrors] = useState(null);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      displayname: "",
      website: "",
      descrption: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const handleLogin = (values) => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    let raw = JSON.stringify({
      account: {
        description: values.descrption,
        display_name: values.displayname,
        name: values.displayname,
        website_url: values.website,
      },
      email: values.email,
      password: values.password,
      username: values.username,
    });

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: raw,
      redirect: "follow",
    };

    fetch(`${config.v1}/user/join`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          setAppErrors(result);
          setSuccess(false);
          return;
        } else {
          setAppErrors(null);
          setSuccess(true);
          //         navigate("/", { replace: true });
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Paper className={classes.form} radius={0} p={30}>
      <ScrollArea
        style={{ height: 800 }}
        type="auto"
        offsetScrollbars
        scrollHideDelay={0}
      >
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          Welcome to Green Forum!
        </Title>
        {appErrors ? (
          <>
            <Notification
              title={appErrors.error}
              disallowClose
              color="red"
              mb={20}
              icon={<X size={18} />}
            >
              {appErrors.details}
            </Notification>
          </>
        ) : (
          <></>
        )}

        {success ? (
          <>
            <Notification
              icon={<Check size={18} />}
              mb={20}
              color="teal"
              title="Account Created!"
              disallowClose
            >
              Your Account created Successfully, click{" "}
              <Anchor href="/login"> here </Anchor> to Login
            </Notification>
          </>
        ) : (
          <></>
        )}

        <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            {...form.getInputProps("email")}
          />

          <TextInput
            label="User name"
            placeholder="Your username"
            size="md"
            mt="md"
            {...form.getInputProps("username")}
          />

          <TextInput
            label="Your name"
            placeholder="Your Name"
            size="md"
            mt="md"
            {...form.getInputProps("displayname")}
          />

          <TextInput
            label="Website"
            placeholder="https://you.xyz"
            size="md"
            mt="md"
            {...form.getInputProps("website")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...form.getInputProps("password")}
          />

          <PasswordInput
            label="Confirm password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...form.getInputProps("confirmPassword")}
          />

          <Textarea
            placeholder="Your Description"
            label="Description"
            size="md"
            mt="md"
            {...form.getInputProps("descrption")}
          />

          <Button fullWidth mt="xl" size="md" type="submit" color="green">
            Register
          </Button>
        </form>

        <Text align="center" mt="md" mb={50}>
          Have an account?{" "}
          <Anchor
            href="/login"
            weight={700}
            onClick={(event) => event.preventDefault()}
          >
            Login
          </Anchor>
        </Text>
      </ScrollArea>
    </Paper>
  );
}
