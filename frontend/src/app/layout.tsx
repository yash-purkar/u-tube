import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { ReduxStoreProvider } from "./providers/ReduxStoreProvider";
import { CheckAuthProvider } from "./providers/CheckAuthProvider";
import createEmotionCache from "./createEmotionCache";

const inter = Inter({ subsets: ["latin"] });

const cache = createCache({ key: "css", prepend: true });

const clientSideEmotionCache = createEmotionCache();
const theme = createTheme({
  // Customize your theme here
});

export const metadata: Metadata = {
  title: "U-TUBE",
  description: "Youtube clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxStoreProvider>
          <CheckAuthProvider>
            <ReactQueryProvider>
              {/*to manage the caching of styles */}
              <CacheProvider value={clientSideEmotionCache}>
                {/* to inject a custom theme into your application. */}
                <ThemeProvider theme={theme}>
                  <Navbar />
                  {/* It provides a set of baseline CSS styles that are consistent across browsers. */}
                  <CssBaseline />
                  {children}
                </ThemeProvider>
              </CacheProvider>
            </ReactQueryProvider>
          </CheckAuthProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
