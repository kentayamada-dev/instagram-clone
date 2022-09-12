import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import { constants } from "../../../constants";
import { gaPageview } from "../../../lib/gtag";
import type { GaTagsType } from "./index.types";

const { GA_TRACKING_ID } = constants;

export const GaTags: GaTagsType = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string): void => gaPageview(url);
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);

    // eslint-disable-next-line consistent-return
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
      <Script
        dangerouslySetInnerHTML={{
          // eslint-disable-next-line @typescript-eslint/naming-convention
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `
        }}
        id="gtag-init"
        strategy="afterInteractive"
      />
    </>
  );
};
