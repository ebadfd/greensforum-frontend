import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Skeleton,
  Text,
  useMantineTheme,
  Breadcrumbs,
  Anchor,
  Stack,
  Paper,
  ScrollArea,
} from "@mantine/core";
import { CommentCard } from "../components/Comment/comment";
import { useParams } from "react-router-dom";
import { GetPostbySlug } from "../services/post.slug";

import { Link } from "react-router-dom";
import { PostAnswer } from "../components/PostAnswer/answer";

import DisplayPostDetails from "../components/QuestionDetails/info";

export default function Post() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  const theme = useMantineTheme();

  const { slug } = useParams();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const items = [
    { title: "Home", href: "/" },
    { title: slug, href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const fetchData = async () => {
    let data = await GetPostbySlug(slug);
    setQuestion(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!question) {
    return <LoadingPost />;
  } else if (question.id <= 0) {
    return (
      <Container p={0} m={0} pl={10} size={2000}>
        <Paper p="md">
          <Grid>
            <Grid.Col xs={2} className="slidebarleft" />
            <Grid.Col xs={6} p="lg">
              <Paper shadow="xl" p="xl" withBorder>
                404 question not found
              </Paper>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    );
  } else {
    return (
      <div>
        <Container p={0} m={0} pl={10} size={2000}>
          <Paper p="md">
            <Grid>
              <Grid.Col xs={2} className="slidebarleft" />
              <Grid.Col xs={6} p="lg">
                <Breadcrumbs mb={20}>{items}</Breadcrumbs>
                <DisplayPostDetails loading={loading} question={question} />

                <PostAnswer pid={question.id} />
                <Paper shadow="xl" p="xl" withBorder mt={50}>
                  <Text
                    size="lg"
                    weight={500}
                    style={{ color: secondaryColor, lineHeight: 2 }}
                  >
                    {question.answer_count} Answers
                  </Text>

                  <ScrollArea style={{ height: 500 }} mt="lg" scrollbarSize={6}>
                    {question.answers ? (
                      <>
                        {question.answer_count > 0 ? (
                          <>
                            {question.answers.map((item) => {
                              return <CommentCard props={item} />;
                            })}
                          </>
                        ) : (
                          <Text>
                            {" "}
                            Browse other{" "}
                            <Anchor component={Link} to="/questions/all">
                              {" "}
                              questions{" "}
                            </Anchor>{" "}
                            , or Ask your own{" "}
                            <Anchor component={Link} to="/create">
                              question{" "}
                            </Anchor>
                          </Text>
                        )}
                      </>
                    ) : (
                      <Text>
                        {" "}
                        Browse other{" "}
                        <Anchor component={Link} to="/questions/all">
                          {" "}
                          questions{" "}
                        </Anchor>{" "}
                        , or Ask your own{" "}
                        <Anchor component={Link} to="/create">
                          question{" "}
                        </Anchor>
                      </Text>
                    )}
                  </ScrollArea>
                </Paper>
              </Grid.Col>
              <Grid.Col xs={3} ml={100}>
                <p> sudgest posts </p>
              </Grid.Col>
            </Grid>
          </Paper>
        </Container>
      </div>
    );
  }
}

function LoadingPost() {
  return (
    <Container p={0} m={0} pl={10} size={2000}>
      <Paper p="md">
        <Grid>
          <Grid.Col xs={2} className="slidebarleft" />
          <Grid.Col xs={6} p="lg">
            <Paper shadow="xl" p="xl" withBorder>
              <Grid grow gutter="xs">
                <Grid.Col span={1}>
                  <Stack>
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />

                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </Stack>
                </Grid.Col>
                <Grid.Col span={10}>
                  <Skeleton height={8} mt={6} radius="xl" />
                  <Skeleton height={8} mt={6} radius="xl" />
                  <Skeleton height={8} mt={6} width="70%" radius="xl" />

                  <Text size="xs" color="dimmed" mt={30}>
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </Text>
                </Grid.Col>
              </Grid>
            </Paper>

            <Paper shadow="xl" p="xl" withBorder mt={50}>
              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} width="70%" radius="xl" />
            </Paper>

            <Paper shadow="xl" p="xl" withBorder mt={50}>
              <Text size="lg" weight={500}>
                Answers
              </Text>
              <br />

              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} width="70%" radius="xl" />

              <br />

              <Skeleton height={8} mt={6} width="70%" radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />

              <Skeleton height={8} mt={6} radius="xl" />

              <br />

              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} width="70%" radius="xl" />

              <br />

              <Skeleton height={8} mt={6} radius="xl" />

              <Skeleton height={8} mt={6} width="70%" radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
            </Paper>
          </Grid.Col>
          <Grid.Col xs={3} ml={100}></Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
}
