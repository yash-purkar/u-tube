import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "./createEmotionCache";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { ReduxStoreProvider } from "./providers/ReduxStoreProvider";
import { CheckAuthProvider } from "./providers/CheckAuthProvider";
import theme from "./theme";

const inter = Inter({ subsets: ["latin"] });

const clientSideEmotionCache = createEmotionCache();

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
        <CacheProvider value={clientSideEmotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ReduxStoreProvider>
              <CheckAuthProvider>
                <ReactQueryProvider>
                  <Navbar />
                  {children}
                </ReactQueryProvider>
              </CheckAuthProvider>
            </ReduxStoreProvider>
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
