import { useState } from 'react';
import {
  Popover,
  Button,
  Group,
  TextInput,
  Avatar,
  Anchor,
    Paper,
  Text,
    Notification, 
  ActionIcon,
  useMantineTheme,
    SimpleGrid, 
} from '@mantine/core';
import { Notification as NoficationIcon } from 'tabler-icons-react';

function UserEditForm() {

  return (
      <Group position="apart" style={{ marginTop: 15 }}>

 <SimpleGrid cols={1}>

 <Notification title="We notify you that" disallowClose>
        You are now obligated to give a star to Mantine project on GitHub
      </Notification>
 <Notification title="We notify you that" disallowClose>
        You are now obligated to give a star to Mantine project on GitHub
      </Notification>

 <Notification title="We notify you that" disallowClose>
        You are now obligated to give a star to Mantine project on GitHub
      </Notification>


    </SimpleGrid>
      </Group>
  );
}



export function NotificationPopOver({ user }) {
  const [values, setValues] = useState({ name: 'Bob Handsome', email: 'bob@handsome.inc' });
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
      <>
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom"
        placement="end"
        withCloseButton
        title="Notifications"
        transition="pop-top-right"
        target={
          <ActionIcon
            variant={theme.colorScheme === 'dark' ? 'hover' : 'light'}
            onClick={() => setOpened((o) => !o)}
          >
            <NoficationIcon size={16} />
          </ActionIcon>
        }
      >
        <UserEditForm
          initialValues={values}
          onCancel={() => setOpened(false)}
          onSubmit={(data) => {
            setValues(data);
            setOpened(false);
          }}
        />
      </Popover>

      </>
       );
}
