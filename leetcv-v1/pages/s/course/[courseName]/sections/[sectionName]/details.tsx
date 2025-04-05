import SectionDetails from "@components/leetlingo/sectionDetails";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

const SectionDetailsPage = () => {
  const router = useRouter();
  const { courseName, sectionName } = router.query;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionDetails sectionName={sectionName!} courseName={courseName!} />
    </div>
  );
};

export default SectionDetailsPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      messages: require(`../../../../../../messages/${context.locale}.json`),
    },
  };
}
