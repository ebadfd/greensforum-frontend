import { Menu, Divider, UnstyledButton } from "@mantine/core";

import { Link } from "react-router-dom";

import { useLocalStorage } from "@mantine/hooks";
import { AccessibleOff, Alien, MessageCircle } from "tabler-icons-react";
export function AdminInformation({ admins, loading, slug }) {
  if (loading) {
    return <> </>;
  } else if (!admins) {
    return <> </>;
  } else {
    const [value, setValue] = useLocalStorage({ key: "user" });
    let isadmin = false;

    admins.map((item) => {
      if (value) {
        if (item.ID === value.ID) {
          isadmin = true;
        }
      }
    });

    if (isadmin) {
      return (
        <Menu>
          <Menu.Label>{slug}</Menu.Label>
          <Menu.Item icon={<AccessibleOff size={14} />}>
            {" "}
            <UnstyledButton
              component={Link}
              to={`/collective/${slug}/unaproved`}
            >
              {" "}
              Unaproved posts
            </UnstyledButton>{" "}
          </Menu.Item>
          <Menu.Item icon={<MessageCircle size={14} />}>
            {" "}
            <UnstyledButton component={Link} to={`/collective/${slug}`}>
              {" "}
              {slug}
            </UnstyledButton>{" "}
          </Menu.Item>
          <Divider />
          <Menu.Label>Details</Menu.Label>
          <Menu.Item icon={<Alien size={14} />}>
            <UnstyledButton component={Link} to={`/collective/${slug}/members`}>
              {" "}
              Members
            </UnstyledButton>
          </Menu.Item>
        </Menu>
      );
    } else {
      <> </>;
    }
  }
}
