import React, { useEffect, useState } from "react";
import { Paper, Grid, Skeleton, Group, Button, Box, Text } from "@mantine/core";

import { AllEvents } from "../services/events.all";
import { Link } from "react-router-dom";
import LoadingPost from "../components/ForumCard/loading";
import DOMPurify from "dompurify";

export default function ViewAllEvents() {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    let data = await AllEvents();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    console.log(events);
  }, []);

  return (
    <>
      <Box p={20}>
        <Grid>
          <Grid.Col span={12}>
            <Group position="apart">
              <h1> Events Happening </h1>
              <Button component={Link} to="/create" color={"green"}>
                Ask Question
              </Button>
            </Group>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={12}>
            {loading ? (
              <>
                {[...Array(10)].map(() => (
                  <LoadingPost />
                ))}
              </>
            ) : (
              <>
                {events.length > 0 ? (
                  <>
                    {events.map((q) => {
                      return (
                        <>
                          <Paper
                            shadow="xs"
                            p="md"
                            mt={20}
                            component={Link}
                            to={`/event/${q.slug}`}
                          >
                            <Text size="lg">{q.name}</Text>

                            <Text
                              size="md"
                              mt={20}
                              lineClamp={3}
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(q.description),
                              }}
                            />
                          </Paper>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <p>{notfound}</p>
                )}
              </>
            )}
          </Grid.Col>
        </Grid>
      </Box>
    </>
  );
}
