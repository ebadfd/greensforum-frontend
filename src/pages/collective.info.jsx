import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Text,
  Tabs,
  Group,
  Button,
  ScrollArea,
  Center,
} from "@mantine/core";

import ForumCard from "../components/ForumCard/card";
import LoadingPost from "../components/ForumCard/loading";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { GetCollectivebyinfo } from "../services/collective.one";
import { ImageActionBanner } from "../components/collectiveCard/newcard";
import { PostCard } from "../components/post/post.card";
import { ArticleCardImage } from "../components/collectiveCard/about.side.card";

import { AdminInformation } from "../components/Collective/admin.information";

export default function CollectiveInformation() {
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
    return (
      <Center style={{ width: 400, height: 200 }}>
        <h1> 404 </h1>
      </Center>
    );
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
          <Grid.Col span={12}>
            <ImageActionBanner props={questions} isBig={true} />
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={1}>{}</Grid.Col>
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
          <Grid.Col span={1}>{}</Grid.Col>
          <Grid.Col span={7}>
            <Tabs variant="outline" tabPadding="lg">
              <Tabs.Tab label="Questions">
                <DisplayQuestions questions={questions} loading={loading} />
              </Tabs.Tab>
              <Tabs.Tab label="Atricles">
                <DisplayPosts questions={questions} loading={loading} />
              </Tabs.Tab>
            </Tabs>
          </Grid.Col>
          <Grid.Col span={3}>
            <ArticleCardImage
              name={questions.name}
              title="something here"
              category={"xyz"}
              author="dasith"
              footer={"idek"}
              description={questions.description}
              created_at={questions.created_at}
              admins={questions.Admins}
              tags={questions.tags}
              slug={slug}
            />
          </Grid.Col>
        </Grid>
      </>
    );
  }
}

// questions.Post is a array of all the posts in a catogary
function DisplayPosts({ questions, loading }) {
  if (!questions) {
    return <h1> no questions </h1>;
  } else {
    return (
      <ScrollArea style={{ height: 700 }}>
        {loading ? (
          <>
            {[...Array(10)].map(() => (
              <LoadingPost />
            ))}
          </>
        ) : (
          <>
            {questions.Post.length > 0 ? (
              <>
                {questions.Post.map((q) => {
                  return <PostCard props={q} />;
                })}
              </>
            ) : (
              <h1> no results found.</h1>
            )}
          </>
        )}
      </ScrollArea>
    );
  }
}

function DisplayQuestions({ questions, loading }) {
  if (!questions) {
    return <h1> no questions </h1>;
  } else {
    return (
      <ScrollArea style={{ height: 700 }}>
        {loading ? (
          <>
            {[...Array(10)].map(() => (
              <LoadingPost />
            ))}
          </>
        ) : (
          <>
            {questions.questions.length > 0 ? (
              <>
                {questions.questions.map((q) => {
                  return <ForumCard props={q} />;
                })}
              </>
            ) : (
              <h1> no results found.</h1>
            )}
          </>
        )}
      </ScrollArea>
    );
  }
}
