import React from "react";
import {
  Title,
  Text,
  Container,
  Button,
  Overlay,
  SimpleGrid,
  createStyles,
  Group,
  Image,
  Anchor,
} from "@mantine/core";
import { HeaderAction } from "../components/landing/header";
import { FeaturesDetails } from "../components/landing/details";
import { ApplicationFooter } from "../components/landing/footer";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 180,
    paddingBottom: 130,
    backgroundImage: "url(/nsbm1.png)",
    backgroundSize: "cover",
    backgroundPosition: "left",

    "@media (max-width: 520px)": {
      paddingTop: 80,
      paddingBottom: 50,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
    margin: 20,
  },

  ContentTitle: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: "right",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: "right",

    "@media (max-width: 520px)": {
      fontSize: theme.fontSizes.md,
      textAlign: "left",
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 1.5,
    display: "flex",
    justifyContent: "right",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,

    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
  secondaryControl: {
    color: theme.white,
    backgroundColor: "rgba(255, 255, 255, .4)",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, .45) !important",
    },
  },
}));

export function LandingPage() {
  const { classes, cx } = useStyles();

  return (
    <>
      <div className={classes.wrapper}>
        <Overlay color="#000" opacity={0.3} zIndex={1} />
        <div className={classes.inner}>
          <Title className={classes.title}>NSBM GREEN FORUM</Title>

          <div className={classes.controls}>
            <Text size="lg" className={classes.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
              Aliquam et magna in nulla convallis suscipit.
            </Text>
          </div>

          <div className={classes.controls}>
            <Button
              className={cx(classes.control, classes.secondaryControl)}
              size="lg"
              component={Link}
              to="/login"
            >
              Login
            </Button>

            <Button
              className={classes.control}
              variant="white"
              size="lg"
              component={Link}
              to="/register"
            >
              Get started
            </Button>
          </div>
        </div>
      </div>
      <FeaturesDetails />

      <ApplicationFooter />
    </>
  );
}
