"use client";
import "../styles/globals.css";
import { AppProvider } from "../context/state";
import client from "../lib/wagmiClient";
import { WagmiConfig } from "wagmi";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AppProvider>
        <WagmiConfig client={client}>
          <body>{children}</body>
        </WagmiConfig>
      </AppProvider>
    </html>
  );
}
