import React, { useEffect, useState } from "react";
import {
  Text,
  Title,
  SimpleGrid,
  Container,
  Loader,
  createStyles,
  Skeleton,
  Paper,
  Box,
} from "@mantine/core";
import { CardWithStats } from "../components/collectiveCard/card";
import { ImageActionBanner } from "../components/collectiveCard/newcard";

import { ViewCollectives } from "../services/collective.all";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 1,
    paddingBottom: theme.spacing.xl * 2,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 28,
      textAlign: "left",
    },
  },
}));

export default function Collectives() {
  const { classes } = useStyles();
  const [collectives, setCollectives] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    let data = await ViewCollectives();
    setCollectives(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    console.log(collectives, loading);
  }, []);

  return (
    <>
      <Box p={20}>
        <Title className={classes.title}>
          Communities for your favorite things{" "}
        </Title>

        <Text size="sm">
          Collectives helps you find trusted answers faster, engage with product
          experts, and share knowledge around the technologies you use most.
        </Text>

        <SimpleGrid cols={3} spacing="lg" mt={50}>
          {loading ? (
            <>
              <Skeleton height={150} />
              <Skeleton height={150} />
              <Skeleton height={150} />
            </>
          ) : (
            <>
              {collectives.length > 0 ? (
                <>
                  {collectives.map((item) => {
                    return <ImageActionBanner props={item} isBig={false} />;
                  })}
                </>
              ) : (
                <h1> no collectives found </h1>
              )}
            </>
          )}
        </SimpleGrid>
      </Box>
    </>
  );
}
