import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Text,
  Accordion,
  Group,
  List,
  Modal,
  Button,
  TextInput,
  Notification,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { useForm } from "@mantine/form";
import { useParams } from "react-router-dom";

import { isValidToken, getAuthStorage } from "../authtoken";
import { config } from "../config";
import { LoginForm } from "../components/Login/login";
import { showNotification } from "@mantine/notifications";
import ApplicationLayout from "../layouts";

export default function CreateArticleOnCollective() {
  return (
    <ApplicationLayout
      mainContent={<Editor />}
      displaySideBar={true}
      SideBarDisplayComponent={<DisplayHelpMessage />}
    />
  );
}

function Editor() {
  const [opened, setOpened] = useState(false);
  const [value, onChange] = useState(" ");

  const { slug } = useParams();

  const form = useForm({
    initialValues: {
      title: "",
      tags: "",
    },
  });

  const HandlePostCreation = (values) => {
    if (!isValidToken()) {
      setOpened(true);
      return;
    }
    // check if post body is empty
    if (value == "<p><br></p>") {
      showNotification({
        title: "Validation Error",
        message:
          "post body is empty. make sure you have content on the post body",
        color: "red",
      });
      return;
    }

    let tags = values.tags.split(",");

    const data = {
      title: values.title,
      body: value,
      tags: tags,
    };

    /* submit the form */

    const tokens = getAuthStorage();

    var headers = new Headers();
    headers.append("Authorization", `Bearer ${tokens.auth_token}`);

    let raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: headers,
      body: raw,
      redirect: "follow",
    };

    fetch(`${config.v1}collectives/${slug}/post/write`, requestOptions)
      .then((result) => result.json())
      .then((data) => {
        if (data.error) {
          showNotification({
            title: data.error,
            message: data.details,
            color: "red",
          });

          return;
        } else {
          console.log(data);

          showNotification({
            title: "Article Submitted",
            message:
              "Article submitted for review, click on your profile icon to view submission status",
            color: "teal",
          });
        }
      });

    console.log(values);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Please login to continue"
      >
        <LoginForm />
      </Modal>
      <h1> Propose an article for {slug} </h1>

      <form onSubmit={form.onSubmit((values) => HandlePostCreation(values))}>
        <Paper shadow="xl" p="md" withBorder>
          <Text weight={500} size="lg" mb={10}>
            Title
          </Text>
          <TextInput
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            variant="default"
            mb={"md"}
            {...form.getInputProps("title")}
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
            placeholder="e.g. (sql-server,ajax,css)"
            variant="default"
            mb={"md"}
            {...form.getInputProps("tags")}
          />

          <Text size="xs">describe what your question is about</Text>
        </Paper>

        <Button size="sm" mt={20} type="submit" color="green">
          Submit for Review
        </Button>
      </form>
    </>
  );
}

function DisplayHelpMessage() {
  return (
    <>
      <Text>Guidelines</Text>

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
          Show what you’ve tried and tell us what you found (on this site or
          elsewhere) and why it didn’t meet your needs. You can get better
          answers when you provide research.
        </Accordion.Item>

        <Accordion.Item label="Show some example">
          When appropriate, share the minimum amount of code others need to
          reproduce your problem (also called a minimum, reproducible example)
        </Accordion.Item>
      </Accordion>
    </>
  );
}
