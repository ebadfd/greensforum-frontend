import { ActionIcon, Group } from "@mantine/core";
import { Sun, MoonStars } from "tabler-icons-react";
//useMantineColorScheme
export function ColorSchemeToggle() {
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center">
      <ActionIcon> </ActionIcon>
    </Group>
  );
}

/*
    *
    *   <ActionIcon
        onClick={() => console.log("hi")}
        size="xl"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
        })}
      >
        {colorScheme === 'dark' ? <Sun size={24} /> : <MoonStars size={24} />}
      </ActionIcon>
*/
