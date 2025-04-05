import Head from "next/head";

export interface HeadSeoProps {
  title: string;
  children?: React.ReactNode;
}

const HeadSeo = ({ title, children }: HeadSeoProps) => {
  return (
    <Head data-testid="headSeo">
      <title>{title}</title>
      <link rel="manifest" href="/manifest.json" />
      {children}
    </Head>
  );
};

export default HeadSeo;
