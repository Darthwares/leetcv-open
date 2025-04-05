import React, { useEffect } from "react";
import Container from "@components/container";
import { InstantSearch } from "react-instantsearch-dom";
import {
  CustomSearchBox,
  searchClient,
} from "@components/search/AlgoliaSearch";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import { useSetRecoilState } from "recoil";
import { pageTitleState } from "@state/state";
import { useTranslations } from "next-intl";
import Footer from "@components/home/footer";
import MobileSearchFilter from "@components/search/mobileSearchWithFilter";

export async function getServerSideProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}

export default function Search() {
  const setProdTitle = useSetRecoilState(pageTitleState);
  const t = useTranslations("Search");

  useEffect(() => {
    setProdTitle(t("search"));
  }, []);

  return (
    <div>
      <NextSeo
        title={t("title")}
        description={t("description")}
        key={t("key")}
        canonical={t("canonical")}
      />
      <Container>
        <InstantSearch searchClient={searchClient} indexName="Resumes">
          <CustomSearchBox />
          <MobileSearchFilter />
        </InstantSearch>
        <div className=" pt-14">
          <Footer />
        </div>
      </Container>
    </div>
  );
}
