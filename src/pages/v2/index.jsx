import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  SimpleGrid,
  Button,
  Group,
  Paper,
} from "@mantine/core";
import SideBarRight from "../../components/slideBar-right/sidebar";
import { FetchUserFeed } from "../../services/user.feed";
import { Link } from "react-router-dom";
import DisplayQuestions from "../../components/render/displayquestions";

export default function HomePagev2() {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    let data = await FetchUserFeed();
    setQuestions(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    console.log(questions);
  }, []);

  return (
    <div>
      <Container p={0} m={0} pl={10} size={2000}>
        <Grid>
          <Grid.Col xs={9}>
            <Group position="apart">
              <h1> Top Questions For You </h1>
              <Button component={Link} to="/create">
                Ask Question{" "}
              </Button>
            </Group>
            <DisplayQuestions
              loading={loading}
              questions={questions}
              notfound={"no questions found please upvote more posts"}
            />
          </Grid.Col>
          <Grid.Col xs={2.5}>
            <SimpleGrid className="homepagegridsidebargird">
              <SideBarRight />
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
