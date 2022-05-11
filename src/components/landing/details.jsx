import React from "react";
import {
  createStyles,
  Text,
  SimpleGrid,
  Container,
  Image,
} from "@mantine/core";
import { Truck, Certificate, Coin } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  feature: {
    position: "relative",
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: "absolute",
    height: 100,
    width: 160,
    top: 0,
    left: 0,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
    zIndex: 1,
  },

  content: {
    position: "relative",
    zIndex: 2,
  },

  icon: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

export function FeaturesDetails() {
  const { classes, cx } = useStyles();

  return (
    <Container mt={30} mb={30} size="lg">
      <SimpleGrid
        cols={2}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        spacing={50}
      >
        {/* Main page content */}

        <div className={cx(classes.feature)}>
          <Text weight={700} size="xl" mb="xs" mt={5} className={classes.title}>
            A SECURE PLATFORM FOR QUESTIONS , ANSWERS AND NEWS
          </Text>
          <Text color="dimmed" size="sm">
            Lorem ipsum dolor sit amet. Aut quaerat necessita tibus hic quidem
            optio sit perferendis quia ab nesciunt magnam et impedit sapiente et
            consequatur reprehe.
          </Text>
        </div>

        <div className={cx(classes.feature)}>
          <Image src="/homepage.png" />
        </div>

        {/* About the forum content */}

        <div className={cx(classes.feature)}>
          <Image src="/aboutforum.png" />
        </div>

        <div className={cx(classes.feature)}>
          <Text weight={700} size="xl" mb="xs" mt={5} className={classes.title}>
            About Our Forum
          </Text>
          <Text color="dimmed" size="sm">
            Lorem ipsum dolor sit amet. Et consectetur facere qui laboriosam
            amet sit assumenda sum qui ma gni libero non rerum culpa et deserunt
            cumque. Cum nihil illo ut quisquam quo esse magni est ve ritatis
            soluta hic omnis deleniti sed amet commo di est illum Quis. deserunt
            cumque. Cum nihil illo ut quisquam quo esse magni est ve ritatis
            soluta hic omnis deleniti sed amet commodi est illum
          </Text>
        </div>
      </SimpleGrid>
    </Container>
  );
}
