import React, { useEffect, useState } from "react";
import { Paper, Grid, Text, Group, Button } from "@mantine/core";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { GetCollectivebyinfo } from "../services/collective.one";
import { ImageActionBanner } from "../components/collectiveCard/newcard";

import { AdminInformation } from "../components/Collective/admin.information";

export default function MembersofCollective() {
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
    console.log(questions);
  }, []);

  if (!questions) {
    return <h1> 404 </h1>;
  } else {
    return (
      <Paper p="md">
        <Grid>
          <Grid.Col span={2}>{}</Grid.Col>
          <Grid.Col span={9}>
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

                <AdminInformation
                  loading={loading}
                  admins={questions.Admins}
                  slug={slug}
                />
              </Group>
            </Group>
          </Grid.Col>
        </Grid>

        <Grid mt={10}>
          <Grid.Col span={2}>{}</Grid.Col>
          <Grid.Col span={9}>
            <Paper radius="md">
              <Grid grow gutter="xs">
                <Grid.Col span={1}>
                  <ImageActionBanner props={questions} isBig={true} />
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
            <h1> memebers </h1>
          </Grid.Col>
          <Grid.Col span={2}></Grid.Col>
        </Grid>
      </Paper>
    );
  }
}
