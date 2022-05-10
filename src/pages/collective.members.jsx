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
                <Button component={Link} to="/create" variant="outline" color="green">
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
                <ImageActionBanner props={questions} isBig={true} />
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
            <Text size="sm" mb={10}>
              View members of {slug}
            </Text>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={2}>{}</Grid.Col>
          <Grid.Col span={7}>
            <Text size="sm" mb={10}>
              members will be here
            </Text>
          </Grid.Col>
          <Grid.Col span={2}></Grid.Col>
        </Grid>
      </>
    );
  }
}
