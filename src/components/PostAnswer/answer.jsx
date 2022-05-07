import {
  TextInput,
  Text,
  Group,
  Button,
  Textarea,
  Modal,
  Paper,
  Notification,
  Anchor,
  useMantineTheme,
} from "@mantine/core";

import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Check, X } from "tabler-icons-react";
import { LoginForm } from "../Login/login";
import { isValidToken, getAuthStorage } from "../../authtoken";
import { config } from "../../config";

export function PostAnswer({ pid }) {
  const [opened, setOpened] = useState(false);
  const [success, setSuccess] = useState(false);
  const [appErrors, setappErrors] = useState(null);
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const form = useForm({
    initialValues: {
      body: "",
      title: "",
    },
  });

  const HandleCommentSubmission = (values) => {
    if (!isValidToken()) {
      setOpened(true);
    }

    const tokens = getAuthStorage();

    var headers = new Headers();
    headers.append("Authorization", `Bearer ${tokens.auth_token}`);

    let raw = JSON.stringify({
      body: values.body,
      title: values.title,
    });

    var requestOptions = {
      method: "POST",
      headers: headers,
      body: raw,
      redirect: "follow",
    };

    fetch(`${config.v1}question/${pid}/answer/create`, requestOptions)
      .then((result) => result.json())
      .then((data) => {
        if (data.error) {
          setSuccess(false);
          setappErrors(data);
          return;
        } else {
          console.log(data);
          setappErrors(null);
          setSuccess(true);
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

      <Paper shadow="xl" p="xl" withBorder mt={50}>
        {appErrors ? (
          <>
            <Notification
              title={appErrors.error}
              disallowClose
              color="red"
              mb={20}
              icon={<X size={18} />}
            >
              {appErrors.details}
            </Notification>
          </>
        ) : (
          <></>
        )}

        {success ? (
          <>
            <Notification
              icon={<Check size={18} />}
              mb={20}
              color="teal"
              title="Answer added successfully!!"
              disallowClose
            >
              Your answer has been added to this question. thanks for your
              contribution
            </Notification>
          </>
        ) : (
          <></>
        )}
        <Text
          size="xl"
          weight={500}
          style={{ color: secondaryColor, lineHeight: 2 }}
        >
          Your Answer
        </Text>

        <form
          onSubmit={form.onSubmit((values) => HandleCommentSubmission(values))}
        >
          <TextInput
            placeholder="e.g. This can be complete using that"
            label="Title"
            variant="default"
            mt={20}
            size="md"
            required
            {...form.getInputProps("title")}
          />
          <Textarea
            size="md"
            required
            label="Body"
            mt={10}
            placeholder="e.g. You can easily fix this by using this thing. and it works fine"
            variant="default"
            {...form.getInputProps("body")}
          />

          <Group position="left" mt="md">
            <Button type="submit" variant="filled" radius="xs" size="md">
              Post your answer
            </Button>
          </Group>
        </form>
      </Paper>
    </>
  );
}
