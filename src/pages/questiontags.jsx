import React, { useEffect, useState } from "react";
import {
  Paper,
  Card,
  Grid,
  Anchor,
  Skeleton,
  Text,
  Group,
  Button,
  ScrollArea,
  Box,
} from "@mantine/core";

import ForumCard from "../components/ForumCard/card";
import LoadingPost from "../components/ForumCard/loading";
import DisplayQuestions from "../components/render/displayquestions";

import { Link } from "react-router-dom";
import { GetQuestionsTags } from "../services/question.tag";
import { useParams } from "react-router-dom";
import ApplicationLayout from "../layouts";

export default function QuestionsTagged() {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  const fetchData = async () => {
    let data = await GetQuestionsTags(slug);
    setQuestions(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    console.log(questions);
  }, []);

  if (!questions) {
    return <h1> 404 </h1>;
  }

  return (
    <ApplicationLayout
      mainContent={
        <DisplayInformation
          questions={questions}
          loading={loading}
          slug={slug}
        />
      }
      displaySideBar={true}
      SideBarDisplayComponent={
        <GetPostsRealated questions={questions} loading={loading} slug={slug} />
      }
    />
  );
}

function DisplayInformation({ questions, loading, slug }) {
  return (
    <>
      <Box p={20}>
        <Grid>
          <Grid.Col span={12}>
            <Group position="apart">
              <h1> Questions tagged [{slug}] </h1>
              <Button component={Link} to="/create">
                Ask Question
              </Button>
            </Group>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={12}>
            <DisplayQuestions
              questions={questions.Questions}
              loading={loading}
              notfound="no results found."
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <ScrollArea style={{ height: 700 }} mt={20}></ScrollArea>
          </Grid.Col>
        </Grid>
      </Box>
    </>
  );
}

function GetPostsRealated({ loading, questions }) {
  return (
    <>
      <Text component="span" size="xl" weight={700} mb={20}>
        Posts related.
      </Text>

      <ScrollArea>
        {loading ? (
          <>
            {[...Array(10)].map(() => (
              <LoadingPost />
            ))}
          </>
        ) : (
          <>
            {questions.posts.length > 0 ? (
              <>
                {questions.posts.map((q) => {
                  return (
                    <>
                      <Paper shadow="xl" p="sm" withBorder mb={10}>
                        <Anchor component={Link} to={`/post/${q.slug}`}>
                          {q.title}
                        </Anchor>
                        <Text size="xs" lineClamp={2}>
                          {q.body}
                        </Text>
                      </Paper>
                    </>
                  );
                })}
              </>
            ) : (
              <Text size="xs">no posts found.</Text>
            )}
          </>
        )}
      </ScrollArea>
    </>
  );
}
