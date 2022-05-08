import React from "react";
import {
  createStyles,
  Title,
  Container,
  Text,
  UnstyledButton,
  Overlay,
  SimpleGrid,
  Grid,
  Avatar,
  Button,
  Paper,
    TextInput,
    Group, 
    Checkbox,
  Anchor,
  PasswordInput,

} from "@mantine/core";

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

  const name = "dasith312313817312";
  return (
    <Container className={classes.wrapper} size="lg">
      <div className={classes.header}>
        <Title className={classes.title}>dasithvidanae@localhost.com</Title>
        <Title className={classes.titleOverlay} role="presentation">
          {name.substring(0, 7)}
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
              src={"http://example.com"}
              size={120}
              radius={120}
              mx="auto"
            />
            <Text align="center" size="lg" weight={500} mt="md">
              dasith
            </Text>
            <Text align="center" color="dimmed" size="sm">
              daith vidanage
            </Text>

            <Button variant="default" fullWidth mt="md">
              update profile picture
            </Button>
          </Paper>
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


        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Button fullWidth mt="xl">
          Sign in
        </Button>

          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
