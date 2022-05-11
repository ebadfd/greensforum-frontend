import React from "react";
import {
  createStyles,
  Title,
  Textarea,
  Container,
  Text,
  Grid,
  Avatar,
  Button,
  Paper,
  TextInput,
  Alert,
  Anchor,
} from "@mantine/core";

import { AlertCircle } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";
import { config } from "../config";
import { useStyles } from "../styles/profile.style";

export default function UserProfile() {
  const { classes } = useStyles();
  const [user, setUser] = useLocalStorage({ key: "user" });
  const [auth, setAuth] = useLocalStorage({ key: "auth" });

  const requestVerifications = () => {
    console.log("=============== requesting a new verification =============");

    if (!auth) {
      showNotification({
        title: "Auth error",
        message: "Please login again to continue",
        color: "red",
      });
      return;
    }

    let headers = new Headers();
    headers.append("Authorization", `Bearer ${auth.auth_token}`);

    let requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };
    console.log(auth);

    fetch(`${config.v1}user/verify/request`, requestOptions)
      .then((result) => result.json())
      .then((data) => {
        if (data.error) {
          showNotification({
            title: data.error,
            message: data.details,
            color: "red",
          });
          return;
        }

        showNotification({
          title: "Success",
          message: "New email verification requested successfully",
          color: "teal",
        });
      });
  };

  if (!user) {
    return <h1> please login </h1>;
  } else {
    const form = useForm({
      initialValues: {
        name: "",
        description: "",
      },
    });

    const HandleFormSubmission = (values) => {
      console.log(values);
      showNotification({
        title: "not implemented",
        message: "this feature is not yet implemented.",
      });
    };

    return (
      <Container className={classes.wrapper} size="xl">
        <div className={classes.header}>
          <Title className={classes.title}>{user.email}</Title>
          <Title className={classes.titleOverlay} role="presentation">
            {user.username.substring(0, 8)}
          </Title>
        </div>

        {user.verified ? (
          <></>
        ) : (
          <>
            <Alert
              icon={<AlertCircle size={16} />}
              title="Account is not verified!"
              color="red"
              variant="outline"
              mb={20}
            >
              Your Email is not verified. please verify your email. you can find
              a verification email sent to your mailbox. also you can click on
              the below button to request a verification again
              <br />
              <Button
                variant="light"
                color="red"
                radius="xs"
                compact
                mt={10}
                onClick={() => requestVerifications()}
              >
                request verification
              </Button>
            </Alert>
          </>
        )}

        <Grid grow gutter="sm" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <Grid.Col span={4}>
            <Paper
              radius="md"
              withBorder
              p="lg"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.white,
              })}
            >
              <Avatar
                src={user.account.profile_image}
                size={120}
                radius={120}
                mx="auto"
              />
              <Text align="center" size="lg" weight={500} mt="md">
                {user.account.name}
              </Text>
              <Text align="center" color="dimmed" size="sm">
                {user.email}
              </Text>

              <Button
                variant="default"
                fullWidth
                mt="md"
                component={Anchor}
                color="green"
                href="https://en.gravatar.com/"
              >
                Update profile Picture
              </Button>
            </Paper>
            <br />
          </Grid.Col>
          <Grid.Col span={8}>
            <Paper
              radius="md"
              withBorder
              p="xl"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.white,
              })}
            >
              <form
                onSubmit={form.onSubmit((values) =>
                  HandleFormSubmission(values)
                )}
              >
                <TextInput
                  label="Display Name"
                  placeholder="your name"
                  mt={"md"}
                  {...form.getInputProps("name")}
                />
                <Textarea
                  placeholder="your description"
                  label="Description"
                  mt="md"
                  {...form.getInputProps("description")}
                />
                <Button fullWidth mt="xl" type="submit" color="green">
                  Save
                </Button>
              </form>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    );
  }
}
