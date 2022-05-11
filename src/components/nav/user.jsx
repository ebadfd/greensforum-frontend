import { forwardRef } from "react";
import { Group, Avatar, Text, Menu, UnstyledButton } from "@mantine/core";
import {
  Settings,
  Search,
  Photo,
  User,
  Logout,
  ChevronRight,
Lock, 
} from "tabler-icons-react";
import { Link } from "react-router-dom";
import { isVerified } from "../../authtoken"

export function UserProfile({ loggedInUser }) {
    console.log(loggedInUser)
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
            {loggedInUser ? (
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
            ) : (
              <> </>
            )}
          </UnstyledButton>
        }
      >
        {loggedInUser ? (
          <>
            <Menu.Label>Welcome {loggedInUser.username}</Menu.Label>
          </>
        ) : (
          <> </>
        )}
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

      {loggedInUser ? (
          <>
      {loggedInUser.verified ? (
        <Menu.Item icon={<Lock size={14} />}>
          <UnstyledButton component={Link} to={`/user/mod/apply`}>
          Apply for Moderator
          </UnstyledButton>
        </Menu.Item>
      ): (<> </>)}

          </>
      ) : (
          <> </>
      )}



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
