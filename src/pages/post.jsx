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
import { useParams } from "react-router-dom";
import { GetPostbySlug } from "../services/post.slug";

import { PostAnswer } from "../components/PostAnswer/answer";

import DisplayPostDetails from "../components/QuestionDetails/info";
import LoadingPost from "../components/post/post.loading";
import { CommentCard } from "../components/Comment/comment";
import { Link } from "react-router-dom";

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
      <>
        <Grid>
          <Grid.Col xs={1} className="slidebarleft" />
          <Grid.Col xs={12} p="lg">
            <Paper shadow="xl" p="xl" withBorder>
              404 question not found
            </Paper>
          </Grid.Col>
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <Grid>
          <Grid.Col xs={1} />
          <Grid.Col xs={12} p="lg">
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
              {question.answers ? (
                <>
                  {question.answer_count > 0 ? (
                    <>
                      {question.answers.map((item) => {
                        return <CommentCard props={item} />;
                      })}
                    </>
                  ) : (
                    <Text>
                      {" "}
                      Browse other{" "}
                      <Anchor component={Link} to="/questions/all">
                        {" "}
                        questions{" "}
                      </Anchor>{" "}
                      , or Ask your own{" "}
                      <Anchor component={Link} to="/create">
                        question{" "}
                      </Anchor>
                    </Text>
                  )}
                </>
              ) : (
                <Text>
                  {" "}
                  Browse other{" "}
                  <Anchor component={Link} to="/questions/all">
                    {" "}
                    questions{" "}
                  </Anchor>{" "}
                  , or Ask your own{" "}
                  <Anchor component={Link} to="/create">
                    question{" "}
                  </Anchor>
                </Text>
              )}
            </Paper>
          </Grid.Col>
        </Grid>
      </>
    );
  }
}
