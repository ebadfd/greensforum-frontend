import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Skeleton,
  Text,
  Accordion,
  Group,
  List,
  Button,
  TextInput,
  useMantineTheme,
  Card,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";

export default function CreatePost() {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, onChange] = useState("");

  const height = 400;

  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <Paper p="md">
      <Grid>
        <Grid.Col span={2}>{}</Grid.Col>
        <Grid.Col span={7}>
          <Group position="apart">
            <h1> Ask a public question </h1>
          </Group>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={2}>{}</Grid.Col>
        <Grid.Col span={7}>
          <Paper shadow="xl" p="md" withBorder>
            <Text weight={500} size="lg" mb={10}>
              {" "}
              Title{" "}
            </Text>
            <TextInput
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              variant="default"
              mb={"md"}
            />

            <Text size="xs">
              Be specific and imagine you’re asking a question to another person{" "}
            </Text>

            <br />

            <Text weight={500} size="lg" mb={10}>
              Body{" "}
            </Text>

            <RichTextEditor value={value} onChange={onChange} />
            <br />
            <Text size="xs">
              Include all the information someone would need to answer your
              question{" "}
            </Text>

            <br />

            <Text weight={500} size="lg" mb={10}>
              Tags
            </Text>
            <TextInput
              placeholder="e.g. (sql-server ajax css)"
              variant="default"
              mb={"md"}
            />

            <Text size="xs">describe what your question is about</Text>
          </Paper>
        </Grid.Col>
        <Grid.Col span={2}>
          <div style={{ width: 340, margin: "auto" }}>
            <Paper shadow="xl" p="md" withBorder>
              <Text>
                {" "}
                The community is here to help you with specific problem related
                to your university work.Avoid asking opinion-based questions.{" "}
              </Text>

              <br />

              <Accordion>
                <Accordion.Item label="Summarize the problem">
                  <List>
                    <List.Item>Include details about your goal</List.Item>

                    <List.Item> Describe expected and actual results</List.Item>

                    <List.Item>Include any error messages </List.Item>
                  </List>
                </Accordion.Item>

                <Accordion.Item label="Describe what you’ve tried">
                  Show what you’ve tried and tell us what you found (on this
                  site or elsewhere) and why it didn’t meet your needs. You can
                  get better answers when you provide research.
                </Accordion.Item>

                <Accordion.Item label="Show some example">
                  When appropriate, share the minimum amount of code others need
                  to reproduce your problem (also called a minimum, reproducible
                  example)
                </Accordion.Item>
              </Accordion>
            </Paper>
          </div>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
