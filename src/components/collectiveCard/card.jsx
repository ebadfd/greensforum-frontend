import React from "react";
import {
  createStyles,
  Card,
  Image,
  Text,
  Group,
  Button,
  Anchor,
  Paper,
  RingProgress,
} from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

export function CardWithStats({ props }) {
  const { classes } = useStyles();

  return (
    <Paper shadow="xl" radius="xs" p="xs" withBorder>
      <Card.Section>
        <Image src={props.logo_url} alt={props.name} height={100} />
      </Card.Section>

      <Group position="apart" mt="xl">
        <Text
          variant="light"
          size="xs"
          component={Link}
          to={`/collective/${props.slug}`}
          size="xl"
          weight={700}
          className={classes.title}
        >
          {props.name}
        </Text>
        <Text size="xl" weight={700} className={classes.title}></Text>
      </Group>
      <Text mt="md" mb="md" color="dimmed" size="xs">
        {props.description}
      </Text>
    </Paper>
  );
}
