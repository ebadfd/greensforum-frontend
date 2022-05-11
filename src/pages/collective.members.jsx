import React, { useEffect, useState } from "react";
import { Paper, Grid, Text, Group, Button, SimpleGrid } from "@mantine/core";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { GetCollectivebyinfo } from "../services/collective.one";
import { ImageActionBanner } from "../components/collectiveCard/newcard";

import { AdminInformation } from "../components/Collective/admin.information";

import { isJoined } from "../utils/ismember";

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
      <>
        <Grid>
          <Grid.Col span={12}>
            <Group position="right">
              <Group position="left">
                <Button
                  component={Link}
                  to={`/collective/${slug}/article/write`}
                  variant="outline"
                  color="green"
                >
                  Submit a Article
                </Button>
                <Button
                  component={Link}
                  to="/create"
                  variant="outline"
                  color="green"
                >
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

        <Grid mt={12}>
          <Grid.Col span={12}>
            <Grid grow gutter="xs">
              <Grid.Col span={1}>
                <ImageActionBanner
                  props={questions}
                  isBig={true}
                  joined={isJoined(questions)}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={2}>{}</Grid.Col>
          <Grid.Col span={7}>
            <Text weight={700} size="xl" mt={20} mb={10}>
              Members of {slug}
            </Text>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={2}>{}</Grid.Col>
          <Grid.Col span={7}>
            <SimpleGrid cols={3}>
              {questions.Members.length > 0 ? (
                <>
                  {questions.Members.map((member) => {
                    return (
                      <Paper
                        radius="md"
                        withBorder
                        p="lg"
                        sx={(theme) => ({
                          backgroundColor:
                            theme.colorScheme === "dark"
                              ? theme.colors.dark[8]
                              : theme.white,
                        })}
                      >
                        <Text align="center" size="lg" weight={500} mt="md">
                          {member.username}
                        </Text>
                        <Text align="center" color="dimmed" size="sm">
                          {member.email}
                        </Text>

                        <Button
                          variant="default"
                          fullWidth
                          mt="md"
                          component={Link}
                          to={`/user/${member.ID}`}
                        >
                          view profile
                        </Button>
                      </Paper>
                    );
                  })}
                </>
              ) : (
                <>
                  <h1> no members found </h1>
                </>
              )}
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col span={2}></Grid.Col>
        </Grid>
      </>
    );
  }
}
