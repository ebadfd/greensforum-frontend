import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Text,
  Accordion,
  Group,
  List,
  Modal,
  Textarea,
  Button,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { isValidToken, getAuthStorage } from "../../authtoken";
import { config } from "../../config";
import { LoginForm } from "../../components/Login/login";
import { showNotification } from "@mantine/notifications";

export default function CreateCollective() {
  const [opened, setOpened] = useState(false);
  const [success, setSuccess] = useState(false);
  const [appErrors, setappErrors] = useState(null);
  const [value, onChange] = useState(" ");

  const form = useForm({
    initialValues: {
      name: "",
      slug: "",
      logo_url: "",
      description: "",
      website: "",
      gh: "",
      twitter: "",
      tags: "",
    },
  });

  const HandlePostCreation = (values) => {
    if (!isValidToken()) {
      setOpened(true);
      return;
    }

    let tags = values.tags.split(",");

    const data = {
      name: values.name,
      slug: values.slug,
      logo_url: values.logo_url,
      description: values.description,
      website: values.website,
      gh: values.gh,
      twitter: values.twitter,
      tags: tags,
    };

    if (!data.description) {
      showNotification({
        title: "Error!",
        message: "description missing",
        color: "red",
      });
      return;
    }

    console.log(data);
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

    /*

    fetch(`${config.v1}collectives/create`, requestOptions)
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
            title: "Success!",
            message: "new collective create successfully",
            color: "teal",
          });
        }
      });
      */

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
      <Grid>
        <Grid.Col span={1}>{}</Grid.Col>
        <Grid.Col span={7}>
          <Group position="apart">
            <h1> Create a new collective </h1>
          </Group>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={1}>{}</Grid.Col>
        <Grid.Col span={7}>
          <form
            onSubmit={form.onSubmit((values) => HandlePostCreation(values))}
          >
            <Paper shadow="xl" p="md" withBorder>
              <Group grow>
                <TextInput
                  placeholder="Name for the collective"
                  label="Name"
                  variant="default"
                  mb={"md"}
                  {...form.getInputProps("name")}
                />

                <TextInput
                  label="slug"
                  placeholder="user-friendly URLs for your collective"
                  variant="default"
                  mb={"md"}
                  {...form.getInputProps("slug")}
                />
              </Group>

              <Group grow>
                <TextInput
                  label="Website"
                  placeholder="e.g. https://example.com"
                  variant="default"
                  mb={"md"}
                  {...form.getInputProps("website")}
                />

                <TextInput
                  label="Logo"
                  placeholder="e.g. https://example.com/logo.svg"
                  variant="default"
                  mb={"md"}
                  {...form.getInputProps("logo_url")}
                />
              </Group>

              <Group grow>
                <TextInput
                  label="GitHub"
                  placeholder="e.g. @octocat"
                  variant="default"
                  mb={"md"}
                  {...form.getInputProps("gh")}
                />

                <TextInput
                  label="Twitter"
                  placeholder="e.g. @username"
                  variant="default"
                  mb={"md"}
                  {...form.getInputProps("twitter")}
                />
              </Group>

              <Textarea
                placeholder="Include a descrption about the collective. short and sweet"
                label="Descrption"
                variant="default"
                mb={"md"}
                {...form.getInputProps("description")}
              />

              <TextInput
                placeholder="e.g. (sql-server,ajax,css)"
                label="Tags"
                variant="default"
                mb={"md"}
                {...form.getInputProps("tags")}
              />
            </Paper>

            <Button size="sm" mt={20} type="submit" color="green">
              Request Creation for collective
            </Button>
          </form>
        </Grid.Col>
        <Grid.Col span={2}>
          <div style={{ width: 340, margin: "auto" }}>
            <Paper shadow="xl" p="md" withBorder>
              <Text>
                Collectives™ helps you find trusted answers faster, engage with
                product experts, and share knowledge around the technologies you
                use most.
              </Text>

              <br />

              <Accordion>
                <Accordion.Item label="Summarize about the collective">
                  <List>
                    <List.Item>Include details about your goal</List.Item>

                    <List.Item> Describe expected and actual results</List.Item>

                    <List.Item>Include any error messages </List.Item>
                  </List>
                </Accordion.Item>

                <Accordion.Item label="Describe what your intentions">
                  Show what you’ve tried and tell us what you found (on this
                  site or elsewhere) and why it didn’t meet your needs. You can
                  get better answers when you provide research.
                </Accordion.Item>
              </Accordion>
            </Paper>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}
