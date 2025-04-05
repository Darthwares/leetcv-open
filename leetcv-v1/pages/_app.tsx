import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import superjson from "superjson";
import type { AppRouter } from "../server/router";
import { Analytics } from "@vercel/analytics/react";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import { INTERCOM_DEV_APP_ID, INTERCOM_PROD_APP_ID } from "@constants/defaults";
import { logEvent } from "@firebase/analytics";
import { AppProps } from "next/dist/shared/lib/router/router";
import { IntercomProvider } from "react-use-intercom";
import { NextIntlProvider } from "next-intl";
import { useEffect, useState } from "react";
import { useFirebase } from "@lib/firebase";
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";
import { getBaseUrl } from "utils/getBaseUrl";
import Layout from "@components/layout/layout";
import Custom500 from "./500";
import { GetStaticPropsContext } from "next";
import ForegroundNotifi from "@components/foregroundNotification";

let INTERCOM_APP_ID = INTERCOM_DEV_APP_ID;

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const { analytics } = useFirebase();
  const [globalError, setGlobalError] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && analytics) {
      router.events.on("routeChangeComplete", logEvent);
      return () => {
        router.events.off("routeChangeComplete", logEvent);
      };
    }
    if (process.env.NODE_ENV === "production") {
      INTERCOM_APP_ID = INTERCOM_PROD_APP_ID;
    }
  }, [router, analytics]);

  useEffect(() => {
    const handleGlobalError = () => {
      setGlobalError(true);
    };
    window.addEventListener("error", handleGlobalError);
    return () => {
      window.removeEventListener("error", handleGlobalError);
    };
  }, []);

  return (
    <NextIntlProvider messages={pageProps.messages}>
      <IntercomProvider appId={INTERCOM_APP_ID}>
        <RecoilRoot>
          <SessionProvider session={session}>
            <Layout>
              {globalError ? (
                <Custom500 />
              ) : (
                <>
                  <ForegroundNotifi />
                  <Component {...pageProps} />
                  <Analytics />
                </>
              )}
            </Layout>
          </SessionProvider>
        </RecoilRoot>
      </IntercomProvider>
    </NextIntlProvider>
  );
}
export { reportWebVitals } from "next-axiom";
export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;
    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
