import React, { useState, useEffect } from "react";
import {
  createStyles,
  Header,
  Group,
  ActionIcon,
  Container,
  Burger,
  Button,
  TextInput,
  Skeleton,
  Box,
  Modal,
  Avatar,
} from "@mantine/core";

import { useBooleanToggle } from "@mantine/hooks";
import { Search } from "tabler-icons-react";
import { Link } from "react-router-dom";

import { RegisterForm } from "../Register/register";
import { Notification } from "tabler-icons-react";

import { NotificationPopOver } from "../notifications/notification";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  links: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      marginLeft: "auto",
    },
  },

  search: {
    [theme.fn.smallerThan("lg")]: {
      display: "none",
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

function SearhForm() {
  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <form action="/search" method="GET">
        <TextInput
          required
          placeholder="Search Anything"
          name="q"
          size="md"
          width={"150%"}
          icon={<Search size={14} />}
          className="search-bar"
        />
      </form>
    </Box>
  );
}

export function HeaderMiddle({ links, isLoggedIn, loggedInUser, loading }) {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const [modelOpen, setModelOpen] = useState(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
    >
      {link.label}
    </a>
  ));

  return (
    <>
      <Modal opened={modelOpen} onClose={() => setModelOpen(false)} size={700}>
        <RegisterForm />
      </Modal>

      <Header className="application-header" height={58}>
        <Container className={classes.inner}>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            size="sm"
            className={classes.burger}
          />
          <Group className={classes.links} spacing={5}>
            {items}
          </Group>
          <SearhForm />
          <Group spacing={0} className={classes.social} position="right" noWrap>
            <ActionIcon size="lg">
              {loading ? (
                <Skeleton height={34} circle width={40} />
              ) : (
                <>
                  {isLoggedIn ? (
                    <>
                      {loggedInUser ? (
                        <>
                          <NotificationPopOver user={loggedInUser} />
                          <Avatar
                            ml={10}
                            alt={loggedInUser.username}
                            key={loggedInUser.id}
                            src={loggedInUser.account.profile_image}
                            component={Link}
                            to="/profile"
                          ></Avatar>
                        </>
                      ) : (
                        <> </>
                      )}
                    </>
                  ) : (
                    <>
                      <Button
                        variant="subtle"
                        mr={10}
                        type="reset"
                        component={Link}
                        to="/login"
                      >
                        Login
                      </Button>
                      <Button
                        onClick={() => setModelOpen(true)}
                        variant="light"
                      >
                        Register
                      </Button>
                    </>
                  )}
                </>
              )}
            </ActionIcon>
          </Group>
        </Container>
      </Header>

      <br />
      <br />
      <br />
    </>
  );
}
