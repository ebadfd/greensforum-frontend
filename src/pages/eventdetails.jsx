import React, { useEffect, useState } from "react";
import {
  Grid,
  Text,
  useMantineTheme,
  Breadcrumbs,
  Anchor,
  Paper,
  Center,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import LoadingPost from "../components/post/post.loading";

import { GetEventBySlug } from "../services/events.all";

import DOMPurify from "dompurify";

export default function EventDetails() {
  const [event, setEvent] = useState(null);

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
    let data = await GetEventBySlug(slug);
    setEvent(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!event) {
    return <LoadingPost />;
  } else if (event.error) {
    return (
      <>
        <Grid>
          <Grid.Col xs={1} className="slidebarleft" />
          <Grid.Col xs={12} p="lg">
            <Paper shadow="xl" p="xl" withBorder>
              404 event not found
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

            <h1> {event.name} </h1>

            <Text
              size="md"
              mt={20}
              style={{ color: secondaryColor, lineHeight: 1.5 }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(event.description),
              }}
            />
          </Grid.Col>
        </Grid>
      </>
    );
  }
}
