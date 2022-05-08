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
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl * 2,
  },

  header: {
    height: 400,
    boxSizing: "border-box",
    backgroundImage: `linear-gradient(135deg, ${
      theme.colors[theme.primaryColor][4]
    } 0%, ${theme.colors[theme.primaryColor][6]} 100%)`,
    backgroundSize: "cover",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    position: "relative",
    padding: `${theme.spacing.xl * 1.5}px ${theme.spacing.xl * 2}px`,
    borderRadius: theme.radius.lg,
    marginBottom: theme.spacing.lg,

    "@media (max-width: 1080px)": {
      height: "auto",
      flexDirection: "column-reverse",
      alignItems: "initial",
      padding: theme.spacing.xl,
    },
  },

  title: {
    color: theme.white,
    position: "relative",
    zIndex: 1,
    fontSize: 46,
    fontWeight: 800,
    letterSpacing: -0.5,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 1080px)": {
      fontSize: 22,
      textAlign: "center",
      marginTop: theme.spacing.xl,
    },
  },

  titleOverlay: {
    zIndex: 0,
    position: "absolute",
    color: theme.white,
    fontWeight: 900,
    opacity: 0.1,
    fontSize: 320,
    lineHeight: 1,
    top: 10,
    left: 32,
    pointerEvents: "none",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 1080px)": {
      display: "none",
    },
  },

  contact: {
    padding: `${theme.spacing.xl * 1.5}px`,
    backgroundColor: theme.white,
    borderRadius: theme.radius.lg,
    boxShadow: theme.shadows.md,

    "@media (max-width: 1080px)": {
      padding: `${theme.spacing.xl}px`,
    },
  },

  contactTitle: {
    color: theme.black,
    marginBottom: theme.spacing.xl,
    lineHeight: 1,
  },

  categoryCard: {
    height: 160,
    position: "relative",
    backgroundSize: "100%",
    backgroundPosition: "center",
    color: theme.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    overflow: "hidden",
    transition: "background-size 300ms ease",

    "&:hover": {
      backgroundSize: "105%",
    },
  },

  categoryLabel: {
    color: theme.white,
    zIndex: 2,
    position: "relative",
  },
}));

export default function UserProfile() {
  const { classes } = useStyles();
  const [user, setUser] = useLocalStorage({ key: "user" });

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
        title: "Default notification",
        message: "Hey there, your code is awesome! 🤥",
      });
    };

    return (
      <Container className={classes.wrapper} size="lg">
        <div className={classes.header}>
          <Title className={classes.title}>{user.email}</Title>
          <Title className={classes.titleOverlay} role="presentation">
            {user.username.substring(0, 8)}
          </Title>
        </div>

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
                <Button fullWidth mt="xl" type="submit">
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
