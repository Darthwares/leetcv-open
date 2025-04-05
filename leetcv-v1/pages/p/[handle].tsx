import type { GetServerSidePropsContext, NextPage } from "next";
import ProfileViewPage from "@components/dynamicPage";

const PortfolioViewPage: NextPage = () => {
  return (
      <ProfileViewPage
        profileType="portfolio"
        fileName="viewPortfolioCounter"
      />
    
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      messages: require(`../../messages/${context.locale}.json`),
    },
  };
}

export default PortfolioViewPage;
