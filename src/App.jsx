import React, { useState, useEffect } from "react";
import "./App.css";
import Router from "./Router";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import "./index.css";

import { useLocalStorage } from "@mantine/hooks";
import { HeaderMiddle } from "./components/Header/Header";
import attributes from "./components/Header/attributes.json";

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
        {saveUser ? (
          <HeaderMiddle
            links={attributes}
            isLoggedIn={true}
            loggedInUser={saveUser}
            loading={false}
          />
        ) : (
          <HeaderMiddle
            links={attributes}
            isLoggedIn={false}
            loggedInUser={saveUser}
            loading={false}
          />
        )}
        <Router />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
