import React from "react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  createStyles,
  Avatar,
  useMantineTheme,
} from "@mantine/core";

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
}));

export function BadgeCard({ image, username, description, email, pfp }) {
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p="md" className="SidebarCard">
      <Card.Section>
        <Image src={image} alt={username} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group>
          <Avatar color="cyan" radius="lg" src={pfp}>
            {username}
          </Avatar>
          <Text size="lg" weight={500}>
            {username}
          </Text>
        </Group>
        <Text size="sm" mt="xs">
          {description}
        </Text>

        <Text size="sm" mt="xs">
          {email}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button
          radius="xs"
          variant="light"
          color="red"
          uppercase
          style={{ flex: 1 }}
        >
          Log out
        </Button>
      </Group>
    </Card>
  );
}
