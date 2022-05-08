import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  createStyles,
  Skeleton,
  TypographyStylesProvider,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { GetCollectivePostbySlug } from "../services/post.slug";
import DOMPurify from "dompurify";

const useStyles = createStyles((theme, _params) => {
  return {
    wrapper: {
      paddingTop: theme.spacing.xl * 2,
      paddingBottom: theme.spacing.xl * 2,
      minHeight: 650,
    },

    title: {
      fontWeight: 700,
      marginBottom: theme.spacing.xl * 1.5,
    },
  };
});

export default function CollectivePost() {
  const { classes } = useStyles();
  const { slug } = useParams();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    let data = await GetCollectivePostbySlug(slug);
    setQuestion(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(question);

  return (
    <Container size="sm" className={classes.wrapper}>
      {loading ? (
        <Skeleton height={400} />
      ) : (
        <>
          {question ? (
            <>
              <Title align="center" className={classes.title}>
                {" "}
                {question.title}{" "}
              </Title>

              <TypographyStylesProvider>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(question.body),
                  }}
                />
              </TypographyStylesProvider>
            </>
          ) : (
            <>404 question not found</>
          )}
        </>
      )}
    </Container>
  );
}
