import React from "react";
import {
  createStyles,
  Card,
  Overlay,
  Button,
  Text,
  useMantineTheme,
} from "@mantine/core";

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

export function ImageActionBanner({ props, isBig }) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

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
          <Text size="sm" className={classes.description}>
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
            <Button
              className={classes.action}
              variant="white"
              color="dark"
              component="a"
              size="xs"
              href={`/collective/${props.slug}`}
            >
              Join
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
