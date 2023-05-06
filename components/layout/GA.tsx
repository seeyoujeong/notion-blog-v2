import Script from "next/script";

function GA() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-1J5FWZL7PL"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1J5FWZL7PL');
          `}
      </Script>
    </>
  );
}

export default GA;
