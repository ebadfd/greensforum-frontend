import { forwardRef } from "react";
import { Group, Avatar, Text, Menu, UnstyledButton } from "@mantine/core";
import {
  Settings,
  Search,
  Photo,
  User,
  Logout,
  ChevronRight,
} from "tabler-icons-react";
import { Link } from "react-router-dom";

const UserButton = forwardRef(({ image, name, email, icon }) => (
  <UnstyledButton
    sx={(theme) => ({
      display: "block",
      width: "100%",
      padding: theme.spacing.md,
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
      },
    })}
  >
    <Group>
      <Avatar src={loggedInUser.account.profile_image} radius="xl" />

      <div style={{ flex: 1 }}>
        <Text size="sm" weight={500}>
          {name}
        </Text>

        <Text color="dimmed" size="xs">
          {email}
        </Text>
      </div>

      {icon || <ChevronRight size={16} />}
    </Group>
  </UnstyledButton>
));

/*
          <UserButton
            image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            name="Harriette Spoonlicker"
            email="hspoonlicker@outlook.com"
          />
    */

export function UserProfile({ loggedInUser }) {
  return (
    <Group position="center">
      <Menu
        withArrow
        position="right"
        placement="end"
        size="lg"
        shadow="xl"
        control={
          <UnstyledButton
            sx={(theme) => ({
              display: "block",
              width: "100%",
              padding: theme.spacing.md,
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,

              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
          >
            <Group>
              <Avatar src={loggedInUser.account.profile_image} radius="xl" />

              <div style={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  {loggedInUser.username}
                </Text>

                <Text color="dimmed" size="xs">
                  {loggedInUser.email}
                </Text>
              </div>
            </Group>
          </UnstyledButton>
        }
      >
        <Menu.Label>Welcome {loggedInUser.username}</Menu.Label>
        <Menu.Item icon={<Settings size={14} />}>
          <UnstyledButton component={Link} to={`/settings`}>
            Settings
          </UnstyledButton>
        </Menu.Item>
        <Menu.Item icon={<User size={14} />}>
          <UnstyledButton component={Link} to={`/profile`}>
            Profile
          </UnstyledButton>
        </Menu.Item>
        <Menu.Item icon={<Photo size={14} />}>
          <UnstyledButton component={Link} to={`/user/unaproved`}>
            Unaproved posts
          </UnstyledButton>
        </Menu.Item>
        <Menu.Item
          icon={<Search size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘ + k
            </Text>
          }
        >
          <UnstyledButton component={Link} to={`/search`}>
            Search
          </UnstyledButton>
        </Menu.Item>

        <Menu.Item color="red" icon={<Logout size={14} />}>
          Logout
        </Menu.Item>
      </Menu>
    </Group>
  );
}
