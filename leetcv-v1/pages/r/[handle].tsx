import type { GetServerSidePropsContext, NextPage } from "next";
import ProfileViewPage from "@components/dynamicPage";

const ResumeViewPage: NextPage = () => {
  return (
      <ProfileViewPage profileType="resume" fileName="viewCounter" />
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      messages: require(`../../messages/${context.locale}.json`),
    },
  };
}

export default ResumeViewPage;
