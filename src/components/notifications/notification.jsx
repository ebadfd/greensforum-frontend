import { useState, useEffect } from "react";
import {
  Popover,
  Button,
  Group,
  TextInput,
  Avatar,
  Anchor,
  Paper,
  Text,
  Notification,
  ActionIcon,
  useMantineTheme,
  SimpleGrid,
} from "@mantine/core";
import { Notification as NoficationIcon } from "tabler-icons-react";

import { isValidToken, getAuthStorage } from "../../authtoken";
import { config } from "../../config";
import DOMPurify from "dompurify";

function NoficationContent() {
  const [nofications, setNofications] = useState(null);
  const [appErrors, setAppErrors] = useState(null);

  useEffect(() => {
    const tokens = getAuthStorage();

    if (tokens) {
      var headers = new Headers();
      headers.append("Authorization", `Bearer ${tokens.auth_token}`);

      var requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };

      fetch(`${config.v1}user/nofications`, requestOptions)
        .then((result) => result.json())
        .then((data) => {
          if (data.error) {
            setAppErrors(data);
            return;
          }
          setNofications(data);
        });
    } else {
      setNofications(null);
    }
  }, []);

  if (!nofications) {
    return <h1> no nofications found </h1>;
  } else {
    return (
      <Group position="apart" style={{ marginTop: 15 }}>
        <SimpleGrid cols={1}>
          {nofications.length > 0 ? (
            <>
              {nofications.map((item) => {
                return (
                  <Notification title="We notify you that" disallowClose>
                    <Text
                      size="sm"
                      lineClamp={2}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item.message),
                      }}
                    />
                  </Notification>
                );
              })}
            </>
          ) : (
            <h1> no nofications found </h1>
          )}
        </SimpleGrid>
      </Group>
    );
  }
}

export function NotificationPopOver() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <>
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom"
        placement="end"
        withCloseButton
        title="Notifications"
        transition="pop-top-right"
        target={
          <ActionIcon
            variant={theme.colorScheme === "dark" ? "hover" : "light"}
            onClick={() => setOpened((o) => !o)}
          >
            <NoficationIcon size={16} />
          </ActionIcon>
        }
      >
        <NoficationContent
          onCancel={() => setOpened(false)}
          onSubmit={(data) => {
            setValues(data);
            setOpened(false);
          }}
        />
      </Popover>
    </>
  );
}
