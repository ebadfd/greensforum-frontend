import React, { useState, useEffect } from "react";
import { SimpleGrid, Skeleton, Container } from "@mantine/core";
import { useParams } from "react-router-dom";
import { CollectiveUnaprovedPosts } from "../services/collective.unaproved.posts";
import { showNotification } from "@mantine/notifications";
import { TableScrollArea } from "../components/unaproved/table";

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
