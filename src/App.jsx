import React, { useState, useEffect } from "react";
import "./App.css";
import Router from "./Router";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import "./index.css";

import { useLocalStorage } from "@mantine/hooks";
import { HeaderMiddle } from "./components/Header/Header";
import attributes from "./components/Header/attributes.json";
import { isValidToken } from "./authtoken";

function App() {
  const [colorScheme, setColorScheme] = useState("dark");
  const [saveUser, setSaveUser] = useLocalStorage({ key: "user" });

  console.log(saveUser);

  const toggleColorScheme = (value) =>
    setColorScheme(value || colorScheme === "dark");

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <HeaderMiddle
            links={attributes}
            isLoggedIn={isValidToken()}
            loggedInUser={saveUser}
            loading={false}
          />
        </NotificationsProvider>
        <Router />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
