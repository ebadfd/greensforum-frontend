import { useState } from "react";
import "./App.css";
import Router from "./Router";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import "./index.css";

import { HeaderMiddle } from "./components/Header/Header";
import attributes from "./components/Header/attributes.json";

function App() {
  const [colorScheme, setColorScheme] = useState("dark");
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
        <HeaderMiddle links={attributes} />
        <Router />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
