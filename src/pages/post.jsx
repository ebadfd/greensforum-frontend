import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Text,
  useMantineTheme,
  Breadcrumbs,
  Anchor,
  Paper,
  ScrollArea,
} from "@mantine/core";
import { CommentCard } from "../components/Comment/comment";
import { useParams } from "react-router-dom";
import { GetPostbySlug } from "../services/post.slug";

import { Link } from "react-router-dom";
import { PostAnswer } from "../components/PostAnswer/answer";

import DisplayPostDetails from "../components/QuestionDetails/info";
import LoadingPost from "../components/post/post.loading";
import PostAnswers from "../components/post/post.answers";

export default function Post() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  const theme = useMantineTheme();

  const { slug } = useParams();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const items = [
    { title: "Home", href: "/" },
    { title: slug, href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const fetchData = async () => {
    let data = await GetPostbySlug(slug);
    setQuestion(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!question) {
    return <LoadingPost />;
  } else if (question.id <= 0) {
    return (
      <Container p={0} m={0} pl={10} size={2000}>
        <Paper p="md">
          <Grid>
            <Grid.Col xs={2} className="slidebarleft" />
            <Grid.Col xs={6} p="lg">
              <Paper shadow="xl" p="xl" withBorder>
                404 question not found
              </Paper>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    );
  } else {
    return (
      <div>
        <Container p={0} m={0} pl={10} size={2000}>
          <Paper p="md">
            <Grid>
              <Grid.Col xs={2} className="slidebarleft" />
              <Grid.Col xs={6} p="lg">
                <Breadcrumbs mb={20}>{items}</Breadcrumbs>
                <DisplayPostDetails loading={loading} question={question} />

                <PostAnswer pid={question.id} />
                <Paper shadow="xl" p="xl" withBorder mt={50}>
                  <Text
                    size="lg"
                    weight={500}
                    style={{ color: secondaryColor, lineHeight: 2 }}
                  >
                    {question.answer_count} Answers
                  </Text>

                  <PostAnswers question={question} />
                </Paper>
              </Grid.Col>
              <Grid.Col xs={3} ml={100}>
                <p> sudgest posts </p>
              </Grid.Col>
            </Grid>
          </Paper>
        </Container>
      </div>
    );
  }
}
