import Container from "@components/container";
import type { GetStaticPropsContext, NextPage } from "next";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageTitleState, resumeState, userIdState } from "@state/state";
import { trpc } from "utils/trpc";
import { NextSeo } from "next-seo";
import MessagesList from "@components/messages/messageList";
import MobileViewMessagesList from "@components/messages/mobileViewMessageList";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useLeetCVLaunch from "@lib/helper/useLeetcvLaunch";
import { handleSource } from "@constants/defaults";
import NotificationTracker from "@lib/helper/notificationTracking";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const Messages: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  useDailyUserCount();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  const setProdTitle = useSetRecoilState(pageTitleState);
  const t = useTranslations("Messages");
  const [userId] = useRecoilState(userIdState);
  const { isLoading } = trpc.useQuery(["fs.resume.get", { id: userId }]);
  const [resume] = useRecoilState(resumeState);
  const source = handleSource(router);
  useLeetCVLaunch({ resume, userId, source });
  NotificationTracker({
    userId,
    type: "messages",
  });

  useEffect(() => {
    setProdTitle(t("messages"));
    if (typeof window !== "undefined" && (window as any).Intercom) {
      (window as any).Intercom("update", { hide_default_launcher: true });
      (window as any).Intercom("hide");
    }
  }, []);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <>
      <NextSeo
        title={"Messages | LeetCV"}
        description="Connect with your network on LeetCV by sending messages to your followers, followings, and colleagues. Enjoy a user-friendly interface designed for seamless communication."
        key={
          "LeetCV, Messages, Professional Networking, Connect with Colleagues, User-Friendly Messaging"
        }
        canonical={`https://www.leetcv.com/s/messages`}
        openGraph={{
          url: "https://www.leetcv.com/s/messages",
          title: "Messages | LeetCV",
          description:
            "Connect with your network on LeetCV by sending messages to your followers, followings, and colleagues. Enjoy a user-friendly interface designed for seamless communication.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Messages",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Messages",
          description:
            "Connect with your network on LeetCV by sending messages to your followers, followings, and colleagues. Enjoy a user-friendly interface designed for seamless communication.",
          url: "https://www.leetcv.com/s/messages",
        })}
      </script>
      <div className="pageLevelPadding">
        <Container loading={isLoading}>
          <div className="lg:mt-6">
            <div className="hidden lg:block">
              <h2 className="text-2xl font-bold">{t("messages")}</h2>
              <p className="mt-2 leading-8 text-gray-600 pb-5">
                {t("messageList")}
              </p>
            </div>
            <MessagesList />
            <MobileViewMessagesList />
          </div>
        </Container>
      </div>
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../messages/${context.locale}.json`),
    },
  };
}

export default Messages;
