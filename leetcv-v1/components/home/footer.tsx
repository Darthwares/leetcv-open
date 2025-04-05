import {
  DiscordSvg,
  FacebookSvg,
  InstagramSvg,
  LinkedInSvg,
  QrCodeBorder,
  XSvg,
  YoutubeSvg,
} from "@components/svg";
import { handleHref } from "@constants/defaults";
import { sideBarOpenState } from "@state/state";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

export const footerSocialMedia = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100090726970101",
    icon: (props: any) => <FacebookSvg {...props} />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/leetcv-com/",
    icon: (props: any) => <LinkedInSvg {...props} />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/leet_cv/",
    icon: (props: any) => <InstagramSvg {...props} />,
  },
  {
    name: "X",
    href: "https://twitter.com/LeetCv/",
    icon: (props: any) => <XSvg {...props} />,
  },
  {
    name: "Discord",
    href: "https://discord.gg/K5VqkJ8q8u",
    icon: (props: any) => <DiscordSvg {...props} />,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@leet-cv",
    icon: (props: any) => <YoutubeSvg {...props} />,
  },
];

export const footerNavigation = {
  features: [
    { name: "Mock Interview", href: "/interview" },
    { name: "Jobs", href: "/jobagent" },
    { name: "Leet Link", href: "/leetLink" },
    { name: "AI Resume", href: "/aiResume" },
    { name: "Convert Resume", href: "/convertResume" },
    { name: "Cover Letter", href: "/coverLetter" },
    { name: "Resume Ideas", href: "/resumeIdeas" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Messages", href: "/messages" },
    { name: "Requests", href: "/requests" },
    { name: "Attestation", href: "/attestation" },
    { name: "Reviews", href: "/reviews" },
  ],
  resources: [
    { name: "Interview Guides", href: "/interviewGuides" },
    { name: "Job Search Tips", href: "/jobSearchTips" },
    { name: "Chat-GPT Guides", href: "/chatgptGuides" },
    { name: "Case Studies", href: "/caseStudies" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faq" },
  ],
  legal: [
    { name: "Cancellation Policy", href: "/cancellation" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Services", href: "/terms" },
  ],
};

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();
  const router = useRouter();
  const [isSidebarOpen] = useRecoilState(sideBarOpenState);

  return (
    <footer
      aria-labelledby="footer-heading"
      className="bg-white border-t border-gray-100 print:hidden"
    >
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-4 xl:pt-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-4 2xl:gap-6">
          <div className="space-y-8">
            <Link href="/">
              <img
                src="/logo.png"
                className="w-20 mt-2 cursor-pointer"
                alt="LeetCV"
              />
            </Link>
            <p className="text-gray-500 mb-6 mt-5 dark:text-gray-200">
              {t("paragraph")}
            </p>
          </div>
          <div className="mt-6 xl:mt-16 xl:col-span-2">
            <div className="grid grid-cols-3">
              <div className="col-span-2">
                <h3 className="font-semibold leading-6 text-gray-900 mb-4">
                  Features
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {footerNavigation.features.map((item, index) => {
                    const href = handleHref(item.href, router);
                    return (
                      <li
                        key={item.name}
                        className="text-gray-500 hover:text-gray-900"
                      >
                        <Link href={href!}>{item.name}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="grid col-span-1 grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 leading-6 mb-4">
                    Resources
                  </h3>
                  <ul className="flex flex-col gap-y-2">
                    {footerNavigation.resources.map((item) => {
                      const href = handleHref(item.href, router);
                      return (
                        <li
                          key={item.name}
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <Link href={href!}>{item.name}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-2 flex flex-col md:flex-row justify-center md:justify-between items-center">
          <div className="order-1 md:order-2">
            <h3 className="font-semibold text-gray-900 leading-6 mb-4 text-center">
              Company
            </h3>
            <ul className="flex justify-center items-center flex-wrap gap-4">
              {footerNavigation.company.map((item) => {
                const href = handleHref(item.href, router);
                return (
                  <li
                    key={item.name}
                    className="text-gray-500 hover:text-gray-900"
                  >
                    <Link href={href!}>{item.name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="order-2 md:order-1">
            <div className="group relative flex items-center p-4 transition-colors">
              <div className="relative flex w-28 h-28 flex-none items-center justify-center">
                <QrCodeBorder className="absolute inset-0 h-full w-full stroke-gray-300 transition-colors group-hover:stroke-indigo-500" />
                <img
                  src={"/assets/avatars/googlePlayStoreQr.svg"}
                  alt="play store"
                  className="p-1"
                />
              </div>
              <div className="ml-4 md:w-40">
                <p className="text-sm font-semibold dark:text-gray-100 text-gray-900">
                  <span>
                    <span className="absolute inset-0 sm:rounded-2xl" />
                    {t("downloadApp")}
                  </span>
                </p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  {t("scanQrCode")}
                </p>
              </div>
            </div>
          </div>
          <div className="order-3 md:order-3">
            <a
              target={"_blank"}
              rel="noreferrer"
              href="https://play.google.com/store/apps/details?id=com.leetcv.www.twa&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            >
              <img
                src="/assets/socialMediaIcons/google-play-badge.png"
                className="w-36 md:w-48"
                alt="Get it on Google Play"
              />
            </a>
          </div>
        </div>

        {/* Bottom section: Social icons, Legal, and Rights */}
        <div
          className={`mt-4 xl:mt-8 border-t border-gray-200 pt-8 flex flex-col justify-between items-center text-xs xl:text-sm gap-y-2 lg:gap-y-4 ${
            isSidebarOpen ? "xl:flex-row" : "xl:flex-col"
          } 2xl:flex-row`}
        >
          <div
            className={`flex space-x-6 mb-4 lg:mb-0 order-1 ${
              isSidebarOpen ? "xl:order-2" : "xl:order-1"
            } 2xl:order-2`}
          >
            {footerSocialMedia.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="h-6 w-6" />
              </a>
            ))}
          </div>
          <div
            className={`text-gray-400 text-center mb-4 lg:mb-0 order-3 mt-2 xl:mt-0 ${
              isSidebarOpen ? "xl:order-1" : "xl:order-3"
            } 2xl:order-1 flex flex-col`}
          >
            <span>
              &copy; {year} {process.env.NEXT_PUBLIC_PRODUCT_NAME}.{" "}
              {t("rights")}
            </span>
            <a
              className="cursor-pointer"
              target="_blank"
              href={"https://www.darthwares.com/"}
            >
              <span>{t("managedBy")}</span>
            </a>
          </div>
          <div
            className={`flex space-x-6 order-2 flex-wrap justify-center gap-y-2 text-gray-500 dark:text-gray-200  ${
              isSidebarOpen ? "xl:order-3" : "xl:order-2"
            } 2xl:order-3`}
          >
            {footerNavigation.legal.map((item) => {
              const href = handleHref(item.href, router);
              return (
                <Link
                  key={item.name}
                  href={href!}
                  className="text-gray-500 hover:text-gray-900"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
