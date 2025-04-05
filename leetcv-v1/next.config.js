const withPWA = require("next-pwa");
const { withAxiom } = require("next-axiom");

const intercept = require("intercept-stdout");

// safely ignore recoil warning messages in dev (triggered by HMR)
function interceptStdout(text) {
  if (text.includes("Duplicate atom key")) {
    return "";
  }
  if (text.includes("GenerateSW has been called multiple times")) {
    return "";
  }
  return text;
}

if (process.env.NODE_ENV === "development") {
  intercept(interceptStdout);
}

module.exports = withPWA(
  withAxiom({
    reactStrictMode: true,
    i18n: {
      locales: ["en-US", "fr", "nl-NL"],
      defaultLocale: "en-US",
    },
    images: {
      domains: [
        "tailwindui.com",
        "www.tenforums.com",
        "images.unsplash.com",
        "www.gravatar.com",
        "substackcdn.com",
        "d35aaqx5ub95lt.cloudfront.net",
        "images.pexels.com",
        "lh3.googleusercontent.com"
      ],
    },
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === "development",
    },
  })
);
