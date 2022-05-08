import React, { useEffect, useState } from "react";
import {
  Paper,
  Title,
  Grid,
  Skeleton,
  Text,
  Tabs,
  Group,
  Button,
  Image,
  Badge,
  SimpleGrid,
  ScrollArea,
} from "@mantine/core";

import ForumCard from "../components/ForumCard/card";
import LoadingPost from "../components/ForumCard/loading";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { GetCollectivebyinfo } from "../services/collective.one";
import { ImageActionBanner } from "../components/collectiveCard/newcard";
import { PostCard } from "../components/post/post.card";
import { ArticleCardImage } from "../components/collectiveCard/about.side.card";

export default function CollectiveInformation() {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();

  const fetchData = async () => {
    let data = await GetCollectivebyinfo(slug);
    setQuestions(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    console.log("==================== questions ==================");
    console.log(questions);
  }, []);

  const height = 400;

  if (!questions) {
    return <h1> 404 </h1>;
  } else {
    return (
      <Paper p="md">
        <Grid>
          <Grid.Col span={2}>{}</Grid.Col>
          <Grid.Col span={7}>
            <Group position="right">
              <Group position="left">
                <Button
                  component={Link}
                  to={`/collective/${slug}/article/write`}
                  variant="outline"
                >
                  Submit a Article
                </Button>
                <Button component={Link} to="/create" variant="outline">
                  Ask Question
                </Button>
              </Group>
            </Group>
          </Grid.Col>
        </Grid>

        <Grid mt={10}>
          <Grid.Col span={2}>{}</Grid.Col>
          <Grid.Col span={7}>
            <Paper shadow="xl" radius="md">
              <Grid grow gutter="xs">
                <Grid.Col span={1}>
                  <ImageActionBanner props={questions} isBig={true} />
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>
          <Grid.Col span={2}>
            <Paper shadow="xl" radius="md" p="md" withBorder>
              <Grid grow gutter="xs">
                <Grid.Col span={1}>
                  <Image
                    radius="md"
                    src={questions.logo_url}
                    alt={questions.name}
                  />
                </Grid.Col>
                <Grid.Col span={10}>
                  <Title order={3} ml={5}>
                    {questions.name}
                  </Title>
                  <Text size="xs" ml={5}>
                    common tags
                  </Text>

                  <Group mt="lg" gutter="xs">
                    {questions.tags.length > 0 ? (
                      <>
                        {questions.tags.map((item) => {
                          return (
                            <Badge
                              variant="dot"
                              component={Link}
                              to={`/tag/${item}`}
                            >
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
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={2}>{}</Grid.Col>
          <Grid.Col span={7}>
            <Text weight={700} size="xl" mt={20} mb={10}>
              Questions and Posts
            </Text>
            <Text size="sm" mb={10}>
              Browse questions and posts with relevant {questions.name} tags
            </Text>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={2}>{}</Grid.Col>
          <Grid.Col span={7}>
            <Tabs variant="outline" tabPadding="lg">
              <Tabs.Tab label="Questions">questions will be here</Tabs.Tab>
              <Tabs.Tab label="Atricles">
                <DisplayPosts questions={questions} loading={loading} />
              </Tabs.Tab>
            </Tabs>
          </Grid.Col>
          <Grid.Col span={2}>
            <ArticleCardImage
              name={questions.name}
              title="something here"
              category={"xyz"}
              author="dasith"
              footer={"idek"}
              description={questions.description}
              created_at={questions.created_at}
              admins={questions.Admins}
              tags={questions.tags}
              slug={slug}
            />
          </Grid.Col>
        </Grid>
      </Paper>
    );
  }
}

// questions.Post is a array of all the posts in a catogary
function DisplayPosts({ questions, loading }) {
  if (!questions) {
    return <h1> no questions </h1>;
  } else {
    return (
      <ScrollArea style={{ height: 700 }}>
        {loading ? (
          <>
            {[...Array(10)].map(() => (
              <LoadingPost />
            ))}
          </>
        ) : (
          <>
            {questions.Post.length > 0 ? (
              <>
                {questions.Post.map((q) => {
                  return <PostCard props={q} />;
                })}
              </>
            ) : (
              <h1> no results found.</h1>
            )}
          </>
        )}
      </ScrollArea>
    );
  }
}
