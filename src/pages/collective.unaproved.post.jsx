import React, { useState, useEffect } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  SimpleGrid,
  Skeleton,
  Container,
  Button,
  Anchor,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { CollectiveUnaprovedPosts } from "../services/collective.unaproved.posts";
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

export default function UnaprovedPosts() {
  const { slug } = useParams();
  const [postinfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    let data = await CollectiveUnaprovedPosts(slug);

    if (data.error) {
      showNotification({
        title: data.error,
        message: data.details,
        color: "red",
      });
    }

    setPostInfo(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    console.log(postinfo);
  }, []);

  return (
    <Container my="md">
      <h1> Unaproved posts for {slug}.</h1>
      <SimpleGrid cols={1} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
        {loading ? (
          <>
            <Skeleton height={10} />
            <Skeleton height={10} />
            <Skeleton height={10} />
          </>
        ) : (
          <>
            {postinfo.length > 0 ? (
              <TableScrollArea data={postinfo} slug={slug} />
            ) : (
              <p> No posts found. </p>
            )}
          </>
        )}
      </SimpleGrid>
    </Container>
  );
}

function TableScrollArea({ data, slug }) {
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
            <th> Action </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
