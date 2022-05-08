import { Menu, Text, UnstyledButton, Avatar } from "@mantine/core";
import { Link } from "react-router-dom";

import { Settings, Search, Photo, User, Logout } from "tabler-icons-react";

export function UserInformation({ loggedInUser }) {
  return (
    <Menu
      delay={500}
      control={
        <Avatar
          src={loggedInUser.account.profile_image}
          alt={loggedInUser.username}
        />
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
        <UnstyledButton component={Link} to={`/profile`}>
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
  );
}

// UserInformation
