import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import type { GaTagsType } from "./index.types";

export const GaTags: GaTagsType = ({ gaTrackingId }) => {
  const router = useRouter();

  useEffect(() => {
    if (!gaTrackingId) {
      return;
    }
    const handleRouteChange = (url: string): void => {
      window.gtag("config", gaTrackingId, {
        // eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
        page_path: url
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);

    // eslint-disable-next-line consistent-return
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [gaTrackingId, router.events]);

  if (!gaTrackingId) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`} strategy="afterInteractive" />
      <Script
        dangerouslySetInnerHTML={{
          // eslint-disable-next-line @typescript-eslint/naming-convention
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaTrackingId}', {
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
