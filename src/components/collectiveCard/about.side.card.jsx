import React from "react";
import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Divider,
  Text,
  Avatar,
  Badge,
  Anchor,
  Button,
} from "@mantine/core";
import { Heart, Bookmark, Share } from "tabler-icons-react";
import md5 from "md5";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

export function ArticleCardImage({
  title,
  footer,
  author,
  description,
  name,
  created_at,
  admins,
  tags,
  slug,
}) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder p="lg" radius="md" className={classes.card}>
      <Text weight={700} size="lg" className={classes.title} mt="xs">
        {name}
      </Text>

      <Text size="xs" color="dimmed">
        {description}
      </Text>

      <Text size="xs" color="dimmed" mt={10}>
        Created at {new Date(created_at).toDateString()}
      </Text>

      <Divider my="sm" />

      <Text weight={500} className={classes.title} mt="lg" size="md">
        Recognized Members
      </Text>

      <Group mt="lg">
        {admins.length > 0 ? (
          <>
            {admins.map((item) => {
              return (
                <>
                  <Avatar
                    src={`https://www.gravatar.com/avatar/${md5(item.email)}`}
                    radius="sm"
                  />
                  <div>
                    <Text weight={500}>{item.username}</Text>
                    <Text size="xs" color="dimmed">
                      {item.email}
                    </Text>
                  </div>
                </>
              );
            })}

            <Anchor
              component={Link}
              to={`/collective/${slug}/members`}
              size="xs"
            >
              {" "}
              view all members
            </Anchor>
          </>
        ) : (
          <p> no members found. </p>
        )}
      </Group>

      <Divider my="sm" />

      <Text weight={500} className={classes.title} mt="lg" size="md">
        Top tags
      </Text>

      <Group mt="lg" gutter="xs">
        {tags.length > 0 ? (
          <>
            {tags.map((item) => {
              return (
                <Badge variant="dot" component={Link} to={`/tag/${item}`}>
                  {item}
                </Badge>
              );
            })}
          </>
        ) : (
          <Text size="xs" ml={5}>
            no tags found.
          </Text>
        )}
      </Group>
    </Card>
  );
}

//
