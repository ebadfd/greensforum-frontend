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
} from "@mantine/core";

import ForumCard from "../components/ForumCard/card";
import LoadingPost from "../components/ForumCard/loading";

import { Link } from "react-router-dom";
import { GetQuestionsTags } from "../services/question.tag";
import { useParams } from "react-router-dom";

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

  const height = 400;
  return (
    <Paper p="md">
      <Grid>
        <Grid.Col span={2}>{}</Grid.Col>
        <Grid.Col span={7}>
          <Group position="apart">
            <h1> Questions tagged [{slug}] </h1>
            <Button component={Link} to="/create">
              {" "}
              Ask Question{" "}
            </Button>
          </Group>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={2}>{}</Grid.Col>
        <Grid.Col span={7}>
          <ScrollArea style={{ height: 700 }}>
            {loading ? (
              <>
                {[...Array(10)].map(() => (
                  <LoadingPost />
                ))}
              </>
            ) : (
              <>
                {questions.Questions.length > 0 ? (
                  <>
                    {questions.Questions.map((q) => {
                      return <ForumCard props={q} />;
                    })}
                  </>
                ) : (
                  <Text size="xs">no results found.</Text>
                )}
              </>
            )}
          </ScrollArea>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text component="span" align="center" size="xl" weight={700}>
            Posts related.
          </Text>
          <ScrollArea style={{ height: 700 }} mt={20}>
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
                              {" "}
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
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
