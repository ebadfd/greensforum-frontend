import React, { useState, useEffect } from "react";
import {
  Group,
  Title,
  Container,
  Text,
  Grid,
  Avatar,
  Button,
  Paper,
  Alert,
  createStyles,
  Anchor,
  Center,
} from "@mantine/core";

import {
  AlertCircle,
  Link,
  Alien,
  Location,
  Webhook,
} from "tabler-icons-react";
import { useStyles } from "../styles/profile.style";
import { getUserByID } from "../services/user.getbyid";
import { useParams } from "react-router-dom";
import { PhoneCall, At, FileDescription } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

export default function DisplayUsersProfileInformation() {
  const { classes } = useStyles();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    let data = await getUserByID(id);

    if (data.error) {
      showNotification({
        title: data.error,
        message: data.description,
        color: "red",
      });
      setUser(null);
      return;
    }
    setUser(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!user) {
    return (
      <Center>
        {" "}
        <h1> not found </h1>{" "}
      </Center>
    );
  } else {
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
              This is not verified, the E-Mail used here is not a verified
              email. this can be not legit account
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
              <Text
                size="xs"
                sx={{ textTransform: "uppercase" }}
                weight={700}
                color="dimmed"
              >
                user information
              </Text>

              <Text size="xl" weight={500} mt={20}>
                {user.account.display_name}
              </Text>

              <Group noWrap spacing={10} mt={20}>
                <At size={16} className={classes.icon} />
                <Text size="xs" color="dimmed">
                  {user.email}
                </Text>
              </Group>

              <Group noWrap spacing={10} mt={5}>
                <FileDescription size={16} className={classes.icon} />
                <Text size="xs" color="dimmed">
                  {user.account.description}
                </Text>
              </Group>

              <Group noWrap spacing={10} mt={5}>
                <Location size={16} className={classes.icon} />
                <Text size="xs" color="dimmed">
                  {user.account.location}
                </Text>
              </Group>

              <Group noWrap spacing={10} mt={5}>
                <Link size={16} className={classes.icon} />
                <Text size="xs" color="dimmed">
                  {user.account.website_url}
                </Text>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    );
  }
}
