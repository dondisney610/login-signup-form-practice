import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { useUser } from "../hooks/firebase";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const currentUser = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/signup");
    }
  }, [currentUser, router]);
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
