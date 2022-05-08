import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Skeleton,
  Text,
  Group,
  Button,
} from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { SearchQuestions } from "../services/post.search";
import { Link } from "react-router-dom";
import DisplayQuestions from "../components/render/displayquestions"

export default function SearchPage() {
  const [searchParams, _] = useSearchParams();
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);

  const term = searchParams.get("q");

  const fetchData = async () => {
    let data = await SearchQuestions(term);
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
            <h1> Search Results </h1>
            <Button component={Link} to="/create">
              {" "}
              Ask Question{" "}
            </Button>
          </Group>

          <Text size="sm"> Results for {term} </Text>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={2}>{}</Grid.Col>
        <Grid.Col span={7}>
      <DisplayQuestions loading={loading} questions={questions} notfound={" no results found."}/>
        </Grid.Col>
        <Grid.Col span={2}>
          <Skeleton height={height} />
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
