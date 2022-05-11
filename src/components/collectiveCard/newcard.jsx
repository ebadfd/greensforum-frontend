import React from "react";
import {
  createStyles,
  Card,
  Overlay,
  Button,
  Text,
  useMantineTheme,
} from "@mantine/core";

import { isValidToken, getAuthStorage } from "../../authtoken";
import { config } from "../../config";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  card: {
    height: 240,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  content: {
    position: "absolute",
    padding: theme.spacing.xl,
    zIndex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },

  action: {
    position: "absolute",
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
  },

  title: {
    color: theme.white,
    marginBottom: theme.spacing.xs / 2,
  },

  description: {
    color: theme.white,
    maxWidth: 220,
  },
}));

export function ImageActionBanner({ props, isBig, joined }) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  const JoinCollective = (slug) => {
    if (!isValidToken()) {
      showNotification({
        title: "Invalid token.",
        message: "the token is invalid or timeout please login again",
        color: "red",
      });
      return;
    }
    const tokens = getAuthStorage();

    if (!tokens) {
      showNotification({
        title: "Invalid token.",
        message: "the token is invalid or timeout please login again",
        color: "red",
      });
      return;
    }

    let reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${tokens.auth_token}`);

    let requestOptions = {
      method: "POST",
      headers: reqHeaders,
      redirect: "follow",
    };

    fetch(`${config.v1}collectives/${slug}/join`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          showNotification({
            title: result.error,
            message: result.details,
            color: "red",
          });
          return;
        }

        showNotification({
          title: "Joined Successfully",
          message: "joind successfully to the collective",
          color: "green",
        });
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Card
      radius="md"
      style={{ backgroundImage: `url(${props.logo_url})` }}
      className={cx(classes.card)}
    >
      <Overlay
        gradient={`linear-gradient(105deg, ${theme.black} 20%, #312f2f 50%, ${theme.colors.gray[4]} 100%)`}
        opacity={0.55}
        zIndex={0}
      />

      <div className={classes.content}>
        <Text size="lg" weight={700} className={classes.title}>
          {props.name}
        </Text>

        {!isBig ? (
          <Text size="sm" className={classes.description} lineClamp={2}>
            {props.description}
          </Text>
        ) : (
          <Text size="sm" className={classes.description} lineClamp={7}>
            {props.description}
          </Text>
        )}

        {!isBig ? (
          <Button
            className={classes.action}
            variant="white"
            color="dark"
            component="a"
            size="xs"
            href={`/collective/${props.slug}`}
          >
            More information
          </Button>
        ) : (
          <>
            {joined ? (
              <>
                <Button className={classes.action} color="red" size="xs">
                  Already Joined
                </Button>
              </>
            ) : (
              <>
                <Button
                  className={classes.action}
                  variant="white"
                  color="dark"
                  size="xs"
                  onClick={() => JoinCollective(props.slug)}
                >
                  Join
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
