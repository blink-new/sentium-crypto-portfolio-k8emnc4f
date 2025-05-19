import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Box } from "./screens/Box/Box";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { XPProvider } from "./contexts/XPContext";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <XPProvider>
          <Box />
        </XPProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);