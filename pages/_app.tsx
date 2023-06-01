import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createClient, configureChains, mainnet, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { AppProvider } from "../context/state";

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

const client = createClient({
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </AppProvider>
  );
}
