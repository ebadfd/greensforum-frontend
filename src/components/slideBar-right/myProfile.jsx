import React from "react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  Avatar,
  useMantineTheme,
  createStyles,
  SimpleGrid,
  UnstyledButton,
  Paper,
} from "@mantine/core";

import {
  BuildingBank,
  Receipt,
  UserPlus,
  Sticker,
  MoodSuprised,
  QuestionMark,
} from "tabler-icons-react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: `${theme.shadows.md} !important`,
      transform: "scale(1.05)",
    },
  },
}));

const mockdata = [
  { title: "Ask Question", icon: QuestionMark, color: "violet" },
  { title: "Discover Communities", icon: BuildingBank, color: "indigo" },
  { title: "Join Communities", icon: UserPlus, color: "green" },
  { title: "Write Posts", icon: Receipt, color: "pink" },
  { title: "Answer Questions", icon: Sticker, color: "red" },
  { title: "Experiance Recommandations", icon: MoodSuprised, color: "orange" },
];

export function BadgeCard({ image, username, description, email, pfp }) {
  const { classes, theme } = useStyles();

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      className="SidebarCard"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Paper
        radius="md"
        withBorder
        p="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
        })}
      >
        <Avatar src={pfp} size={120} radius={120} mx="auto" />
        <Text align="center" size="lg" weight={500} mt="md">
          {username}
        </Text>
        <Text align="center" color="dimmed" size="sm">
          {email}
        </Text>
      </Paper>

      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>

      <Group mt="xs">
        <Button
          radius="md"
          variant="default"
          style={{ flex: 1 }}
          mt={5}
          component={Link}
          to="/questions"
        >
          Browse Questions
        </Button>
      </Group>
    </Paper>
  );
}
