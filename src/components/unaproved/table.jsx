import React, { useState } from "react";
import { Table, createStyles, ScrollArea, Button, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";

import { isValidToken, getAuthStorage } from "../../authtoken";
import { config } from "../../config";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export function TableScrollArea({ data, slug, dissableAction }) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const approvePost = (slug, post_slug) => {
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

    // /collectives/go-lang/this-is-my-new-post/approve

    fetch(
      `${config.v1}collectives/${slug}/${post_slug}/approve`,
      requestOptions
    )
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
          title: "post approved successfully",
          message: "post approved to the collective successfully!",
          color: "green",
        });
        window.location.reload(false);
      })
      .catch((error) => console.log("error", error));
  };

  const rows = data.map((row) => (
    <tr key={row.id}>
      <td>
        <Anchor component={Link} to={`/post/${row.slug}`} color="green">
          {" "}
          {row.title}{" "}
        </Anchor>{" "}
      </td>
      <td>{new Date(row.created_at).toDateString()} </td>
      <td>
        <Anchor component={Link} to={`/u/${row.created_user}`} color="green">
          {row.created_user}{" "}
        </Anchor>{" "}
      </td>
      {dissableAction ? (
        <> </>
      ) : (
        <td>
          <Button
            variant="subtle"
            color="teal"
            compact
            onClick={() => approvePost(slug, row.slug)}
          >
            Accept
          </Button>
        </td>
      )}
    </tr>
  ));

  return (
    <ScrollArea
      sx={{ height: 500 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 700 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Title</th>
            <th>Created at</th>
            <th>Created user</th>
            {dissableAction ? <> </> : <th> Action </th>}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
