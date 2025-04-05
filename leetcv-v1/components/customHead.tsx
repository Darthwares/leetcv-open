import Head from "next/head";

interface CustomHeadProps {
  description: string;
  name: string;
  url?: string;
  image: string;
  skills: string;
}

const CustomHead: React.FC<CustomHeadProps> = ({
  description,
  url = window.location.origin,
  name,
  image,
  skills,
}) => {
  return (
    <Head>
      <meta property="og:description" content={description} />
      <meta property="og:title" content={name} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:skills" content={skills} />
    </Head>
  );
};

export default CustomHead;
