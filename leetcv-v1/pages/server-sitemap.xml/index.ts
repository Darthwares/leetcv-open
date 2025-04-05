import he from "he";

const basePageURL = "https://www.leetcv.com/s/";
const baseURL = "https://www.leetcv.com/";
const baseHandleURL = "https://www.leetcv.com/r/";

const getDate = () => new Date().toISOString();

function generateSiteMap(posts: string[], handles: string[], pages: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${pages
         .map((page) => {
           return `
        <url>
            <loc>${`${baseURL}${page}`}</loc>
            <lastmod>${getDate()}</lastmod>
        </url>
      `;
         })
         .join("")}
        ${handles
          .map((handle) => {
            return `
          <url>
          <loc>${he.encode(`${baseHandleURL}${handle}`)}</loc>
              <lastmod>${getDate()}</lastmod>
          </url>
        `;
          })
          .join("")}
          ${posts
            .map((post) => {
              return `
           <url>
           <loc>${`${basePageURL}${post}`}</loc>
               <lastmod>${getDate()}</lastmod>
           </url>
           
         `;
            })
            .join("")}
   </urlset>
 `;
}

function SiteMap() {
  return null;
}

export async function getServerSideProps({ res }: any) {
  const posts = [
    "dashboard",
    "user",
    "resumeEditor",
    "prospectAttestation",
    "prospects",
    "requestAttestation",
    "requests",
    "resume",
    "reviews",
    "!pages/[*]",
    "!pages/_*.tsx",
  ];

  const pages = ["search.tsx", "about.tsx", "index.tsx", "404.tsx", "help/faq"];

  async function getHandles() {
    const response = await fetch("https://www.leetcv.com/api/handles");
    const handles = await response.json();
    return handles.handleList;
  }
  const handleList = await getHandles();

  const sitemap = generateSiteMap(posts, handleList, pages);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
