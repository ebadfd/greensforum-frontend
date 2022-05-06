import React from "react";
import {
  Text,
  Group,
  Badge,
  Paper,
  useMantineTheme,
  Divider,
  Button,
  Avatar,
} from "@mantine/core";
import { MdOutlineThumbUpAlt, MdOutlineThumbDownAlt } from "react-icons/md";

export function CommentCard() {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <Paper radius="md" withBorder mt={20}>
      <Group style={{ marginBottom: 5, marginTop: theme.spacing.sm }} p={10}>
        <Avatar color="cyan" radius="xl">
          JD
        </Avatar>
        <Text>John Doe</Text>
      </Group>
      <Group position="apart" p={20}>
        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway With
          Fjord Tours you can explore more of the magical fjord landscapes with
          tours and activities on and around the fjords of Norway With Fjord
          Tours you can explore more of the magical fjord landscapes with tours
          and activities on and around the fjords of Norway
        </Text>
      </Group>

      <Divider my="sm" mt={20} variant="dotted" m={20} />

      <Group style={{ marginBottom: 5, marginTop: theme.spacing.sm }} p={10}>
        <Button variant="light" className="ThumbsUpButtons">
          <MdOutlineThumbUpAlt />
        </Button>

        <Button variant="light" className="ThumbsUpButtons" color="red">
          <MdOutlineThumbDownAlt />
        </Button>
      </Group>
    </Paper>
  );
}
