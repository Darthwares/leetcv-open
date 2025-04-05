import Error from "@components/error";
import { GetStaticPropsContext } from "next";

function Custom500() {
  return <Error statusCode={500} />;
}

export default Custom500;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
