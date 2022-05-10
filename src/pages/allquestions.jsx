import React, { useEffect, useState } from "react";
import { Paper, Grid, Skeleton, Group, Button, Box } from "@mantine/core";

import { AllQuestions } from "../services/post.search";
import { Link } from "react-router-dom";
import DisplayQuestions from "../components/render/displayquestions";

export default function DisplayAllQuestions() {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    let data = await AllQuestions();
    setQuestions(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    console.log(questions);
  }, []);

  return (
    <>
      <Box p={20}>
        <Grid>
          <Grid.Col span={12}>
            <Group position="apart">
              <h1> All Questions </h1>
              <Button component={Link} to="/create" color={"green"}>
                Ask Question
              </Button>
            </Group>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={12}>
            <DisplayQuestions
              loading={loading}
              questions={questions}
              notfound={" no results found."}
            />
          </Grid.Col>
        </Grid>
      </Box>
    </>
  );
}
