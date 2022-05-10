
import React from 'react';
import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  Overlay,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { ChevronDown } from 'tabler-icons-react';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));


export function HeaderAction() {
  const { classes } = useStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);

  return (
    <Header height={1}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />
      <h1> hi </h1>
        </Group>
        <Group spacing={5} className={classes.links}>
      <> </>
        </Group>
        <Button radius="xl" sx={{ height: 30 }} >
          Get early access
        </Button>
      </Container>
    </Header>
  );
}
