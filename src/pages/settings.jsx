import React from "react";
import {
  Container,
  SimpleGrid,
  Paper,
  Text,
  useMantineColorScheme,
  SegmentedControl,
  Group,
  Center,
  Box,
} from "@mantine/core";
import { Sun, Moon } from "tabler-icons-react";

export default function Settings() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Container my="md">
      <h1> Settings. </h1>
      <SimpleGrid
        cols={1}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <Paper shadow="xl" p="md" withBorder>
          <Text>Application color scheme </Text>
          <Group my="xl">
            <SegmentedControl
              value={colorScheme}
              onChange={toggleColorScheme}
              data={[
                {
                  value: "light",
                  label: (
                    <Center>
                      <Sun size={16} />
                      <Box ml={10}>Light</Box>
                    </Center>
                  ),
                },
                {
                  value: "dark",
                  label: (
                    <Center>
                      <Moon size={16} />
                      <Box ml={10}>Dark</Box>
                    </Center>
                  ),
                },
              ]}
            />
          </Group>
        </Paper>
      </SimpleGrid>
    </Container>
  );
}
