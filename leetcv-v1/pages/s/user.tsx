import type { GetStaticPropsContext, NextPage } from "next";
import Container from "@components/container";
import { useEffect } from "react";
import { NextSeo } from "next-seo";
import Footer from "@components/home/footer";
import Settings from "@components/settings/settings";
import { useRouter } from "next/router";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const Users: NextPage = () => {
  const router = useRouter();
  useDailyUserCount();

  useEffect(() => {
    if (window.location.pathname === "/s/user") {
      router.push("/s/settings/privacy");
    }
  }, []);

  return (
    <>
      <div className="pageLevelPadding">
        <NextSeo
          title={"User Settings | LeetCV"}
          description="Customize your settings for a personalized experience. Optimize for convenience and efficiency"
          key={"LeetCV, User Settings"}
          canonical={`https://www.leetcv.com/s/users`}
        />
        <Container>
          <Settings />
        </Container>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../messages/pages/user/${context.locale}.json`),
    },
  };
}

export default Users;
