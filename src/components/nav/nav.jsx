import React, { useState, useEffect } from "react";
import {
  createStyles,
  Navbar,
  TextInput,
  Code,
  Space,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Button,
  Tooltip,
  Anchor,
} from "@mantine/core";
import {
  Bulb,
  User,
  Checkbox,
  Search,
  Plus,
  Selector,
} from "tabler-icons-react";
// import { UserProfile } from "./user"

import { useLocalStorage } from "@mantine/hooks";
import { isValidToken } from "../../authtoken";
import { UserProfile } from "./user";
import { Link } from "react-router-dom";
import { ViewCollectives } from "../../services/collective.all";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: "none",
  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },

  collectionLink: {
    display: "block",
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

const links = [
  { icon: Bulb, label: "Feed", notifications: 3, path: "/" },
  { icon: Checkbox, label: "Questions", notifications: 4, path: "/questions" },
  { icon: User, label: "Collectives", path: "/collecives" },
];

const collections = [
  { emoji: "👍", label: "Sales" },
  { emoji: "🚚", label: "Deliveries" },
  { emoji: "💸", label: "Discounts" },
  { emoji: "💰", label: "Profits" },
  { emoji: "✨", label: "Reports" },
  { emoji: "🛒", label: "Orders" },
  { emoji: "📅", label: "Events" },
  { emoji: "🙈", label: "Debts" },
  { emoji: "💁‍♀️", label: "Customers" },
];

export function ApplicationNav({ opened }) {
  const { classes } = useStyles();
  const [saveUser, setSaveUser] = useLocalStorage({ key: "user" });
  const [savedCollectives, setSaveCollectives] = useLocalStorage({ key: "collectives" });

  const [collectives, setCollectives] = useState(null);

  const fetchData = async () => {
    let data = await ViewCollectives();
    setCollectives(data);
      setSaveCollectives(data)
  };

  useEffect(() => {
    if(!savedCollectives){
        console.log("======== fetch and save collectives collectives =========")
        fetchData();
    } 
    setCollectives(savedCollectives)
  }, []);

  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} />
        <Text component={Link} to={link.path}>
          {" "}
          {link.label}{" "}
        </Text>
      </div>
    </UnstyledButton>
  ));

  const CollectionLinks = ({ collections }) => {
    if (!collections) {
      return <h1> loading </h1>;
    } else {
      return (
        <>
          {collections.map((collective) => {
            return (
              <>
                <Link
                  to={`/collective/${collective.slug}`}
                  key={collective.name}
                  className={classes.collectionLink}
                >
                  <span style={{ marginRight: 9, fontSize: 16 }}>
                    {" "}
                    <img src={collective.logo_url} width={23} />
                  </span>{" "}
                  {collective.name}
                </Link>
              </>
            );
          })}
        </>
      );
    }
  };

  return (
    <Navbar
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
      hidden={!opened}
    >
      <Navbar.Section className={classes.section}>
        {isValidToken() ? (
          <UserProfile loggedInUser={saveUser} />
        ) : (
          <>
            <Space h="lg" />
            <Group position="center" spacing="xl">
              <Button
                variant="subtle"
                mr={10}
                type="reset"
                color="green"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                color="green"
                onClick={() => setModelOpen(true)}
                variant="light"
              >
                Register
              </Button>
            </Group>

            <Space h="lg" />
          </>
        )}
      </Navbar.Section>

      <TextInput
        placeholder="Search"
        size="xs"
        icon={<Search size={12} />}
        rightSectionWidth={70}
        rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
        styles={{ rightSection: { pointerEvents: "none" } }}
        mb="sm"
      />

      <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <Group className={classes.collectionsHeader} position="apart">
          <Text size="xs" weight={500} color="dimmed">
            Collections
          </Text>
          <Tooltip label="Create collective" withArrow position="right">
            <ActionIcon
              variant="default"
              size={18}
              component={Link}
              to="/create/collecives"
            >
              <Plus size={12} />
            </ActionIcon>
          </Tooltip>
        </Group>
        {collectives ? (
          <div className={classes.collections}><CollectionLinks collections={collectives}/></div>
        ) : (
          <> </>
        )}
      </Navbar.Section>
    </Navbar>
  );
}
