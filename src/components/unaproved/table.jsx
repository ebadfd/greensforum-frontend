import React, { useState } from "react";
import { Table, createStyles, ScrollArea, Button, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";

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

  const rows = data.map((row) => (
    <tr key={row.id}>
      <td>
        <Anchor component={Link} to={`/post/${row.slug}`}>
          {" "}
          {row.title}{" "}
        </Anchor>{" "}
      </td>
      <td>{new Date(row.created_at).toDateString()} </td>
      <td>
        <Anchor component={Link} to={`/u/${row.created_user}`}>
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
            component={Link}
            to={`/collective/${slug}/${row.slug}/approve`}
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
