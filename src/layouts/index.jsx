import React, { useState } from "react";
import {
  AppShell,
  Image,
  Header,
  Aside,
  Text,
  MediaQuery,
  Box,
  TextInput,
  Burger,
  Kbd,
  useMantineTheme,
} from "@mantine/core";
import { ApplicationNav } from "../components/nav/nav";

import { Search } from "tabler-icons-react";

export default function ApplicationLayout({
  displaySideBar,
  SideBarDisplayComponent,
  mainContent,
}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<ApplicationNav opened={opened} />}
      aside={
        <>
          {displaySideBar ? (
            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                {SideBarDisplayComponent}
              </Aside>
            </MediaQuery>
          ) : (
            <> </>
          )}
        </>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Image radius="sm" height={50} src="/nsbmlogo.svg" />
            <SearhForm />
          </div>
        </Header>
      }
    >
      {mainContent}
    </AppShell>
  );
}

const rightSection = (
  <div style={{ display: "flex", alignItems: "center" }}>
    <Kbd>Ctrl</Kbd>
    <span style={{ margin: "0 5px" }}>+</span>
    <Kbd>K</Kbd>
  </div>
);

function SearhForm() {
  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <form action="/search" method="GET">
        <TextInput
          name="q"
          size="md"
          placeholder="Search"
          icon={<Search size={16} />}
          rightSectionWidth={90}
          rightSection={rightSection}
          styles={{ rightSection: { pointerEvents: "none" } }}
        />
      </form>
    </Box>
  );
}
