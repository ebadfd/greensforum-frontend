import React, { useEffect, useState } from "react";
import {
  Grid,
  TypographyStylesProvider,
  Title,
  Text,
  Group,
  Button,
  Badge,
  useMantineTheme,
  Stack,
  Paper,
} from "@mantine/core";

import { ChevronUp, ChevronDown } from "tabler-icons-react";
import DOMPurify from "dompurify";
import { isValidToken, getAuthStorage } from "../../authtoken";
import { showNotification } from "@mantine/notifications";

import { config } from "../../config";

export default function DisplayPostDetails({ loading, question }) {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  let [upvoteCount, setUpvotecount] = useState(0);

  const UpvotePost = () => {
    if (!isValidToken()) {
      showNotification({
        title: "Unable to upvote",
        message: "Please login to your account before upvoting",
        color: "red",
      });
      return;
    }

    const tokens = getAuthStorage();

    var headers = new Headers();
    headers.append("Authorization", `Bearer ${tokens.auth_token}`);

    let raw = JSON.stringify({
      id: question.id,
    });

    var requestOptions = {
      method: "PATCH",
      headers: headers,
      body: raw,
      redirect: "follow",
    };

    fetch(`${config.v1}question/upvote`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          showNotification({
            title: result.error,
            message: result.details,
            color: "red",
          });
          return;
        } else {
          if (!result.success) {
            showNotification({
              title: "error",
              message: "you have already upvoted to this question",
              color: "red",
            });
            return;
          }

          showNotification({
            title: "success",
            message: "you have successfully upvoted this post",
            color: "teal",
          });

          setUpvotecount(upvoteCount++);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    setUpvotecount(question.up_vote_count);
  }, []);

  return (
    <>
      {loading ? (
        <h1> loading </h1>
      ) : (
        <>
          {question ? (
            <>
              <Paper shadow="xl" p="xl" withBorder>
                <Grid grow gutter="xs">
                  <Grid.Col span={1}>
                    <Stack>
                      <Text
                        size="sm"
                        style={{
                          color: secondaryColor,
                          lineHeight: 2,
                        }}
                      >
                        <Button
                          variant="subtle"
                          color="teal"
                          onClick={() => UpvotePost()}
                        >
                          <ChevronUp />
                        </Button>
                        <Button variant="subtle" color="red">
                          {" "}
                          <ChevronDown />
                        </Button>
                        <br />
                        <Text size="sm">{upvoteCount} upvotes</Text>

                        <Text size="sm" color={secondaryColor}>
                          {question.view_count} views
                        </Text>
                      </Text>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={10}>
                    <Title mb={10}> {question.title}</Title>

                    <TypographyStylesProvider>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(question.body),
                        }}
                      />
                    </TypographyStylesProvider>

                    <Group mt={20}>
                      {question.tags.map((tag) => {
                        return <Badge color="green">{tag.name}</Badge>;
                      })}
                    </Group>

                    <Text size="xs" color="dimmed" mt={30}>
                      {new Date(question.created_at).toDateString()}
                    </Text>
                  </Grid.Col>
                </Grid>
              </Paper>
            </>
          ) : (
            <h1> 404 not found </h1>
          )}
        </>
      )}
    </>
  );
}
