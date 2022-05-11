import React from "react";
import { Title, Text, Button, Overlay } from "@mantine/core";
import { FeaturesDetails } from "../components/landing/details";
import { ApplicationFooter } from "../components/landing/footer";
import { Link } from "react-router-dom";
import { useStyles } from "../styles/landing.style";

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
