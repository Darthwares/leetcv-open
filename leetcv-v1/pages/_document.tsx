import { NextSeo } from "next-seo";
import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <NextSeo
          title="Create Your Professional Resume and CV Online | Free Ai Resume Builder - LeetCV"
          description="LeetCV is an easy-to-use resume builder with excellent features and a strong community. Create visually appealing resumes with a simple and intuitive interface."
          key={
            "LeetCV, Enhance with feedback, Professional Resume, Dynamic Resume, Resume with AI Support, Online Project Showcase, Online Career Timeline, A 'NO' PDF Resume, Peer Reviewed Resume, Private Sharable Resume"
          }
          canonical="https://www.leetcv.com/"
        />
        <Head>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({
                  'gtm.start': new Date().getTime(),
                  event: 'gtm.js'
                });
                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l!='dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5MWTBD9Q');
            `}
          </Script>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon-256x256.png" />
          <meta
            name="keywords"
            content="Online Responsive Resume, Dynamic Responsive Resume Website, LeetCV"
          />
          <meta name="theme-color" content="#fff" />
          <meta name="application-name" content="LeetCV" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta
            name="title"
            content="Create Your Professional Resume and CV Online | Free Ai Resume Builder - LeetCV"
          />
          <meta
            name="description"
            content="LeetCV is an easy-to-use resume builder with excellent features and a strong community. Create visually appealing resumes with a simple and intuitive interface."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.leetcv.com/" />
          <meta
            property="og:title"
            content="Create Your Professional Resume and CV Online | Free Ai Resume Builder - LeetCV"
          />
          <meta
            property="og:description"
            content="LeetCV is an easy-to-use resume builder with excellent features and a strong community. Create visually appealing resumes with a simple and intuitive interface."
          />
          <meta
            property="og:image"
            content="https://leetcv.com/assets/sharable-link.png"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://www.leetcv.com/" />
          <meta
            property="twitter:title"
            content="Create Your Professional Resume and CV Online | Free Ai Resume Builder - LeetCV"
          />
          <meta
            property="twitter:description"
            content="LeetCV is an easy-to-use resume builder with excellent features and a strong community. Create visually appealing resumes with a simple and intuitive interface."
          />
          <meta
            property="twitter:image"
            content="https://leetcv.com/assets/sharable-link.png"
          />

          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="LeetCV" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icon-256x256.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icon-256x256.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="48x48"
            href="/icon-48x48.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/icon-48x48.png" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <meta
            name="twitter:image"
            content="https://leetcv.com/icon-256x256.png"
          />
          <meta name="twitter:creator" content="@leetcv" />
          <link
            href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="font-sans">
          <Main />
          <NextScript />
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-5MWTBD9Q"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
