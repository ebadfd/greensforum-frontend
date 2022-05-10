import React, { useEffect, useState } from "react";
import { Paper, Grid, Skeleton, Text, Group, Button } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { SearchQuestions } from "../services/post.search";
import { Link } from "react-router-dom";
import DisplayQuestions from "../components/render/displayquestions";

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
    <>
      <Grid>
        <Grid.Col span={1}>{}</Grid.Col>
        <Grid.Col span={10}>
          <Group position="apart">
            <h1> Search Results </h1>
            <Button component={Link} to="/create" color="green">
              Ask Question{" "}
            </Button>
          </Group>

          <Text size="sm"> Results for {term} </Text>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={1}>{}</Grid.Col>
        <Grid.Col span={10}>
          <DisplayQuestions
            loading={loading}
            questions={questions}
            notfound={" no results found."}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}
