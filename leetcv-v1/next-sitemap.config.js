const siteUrl = "https://www.leetcv.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: "daily",
  sitemapSize: 3000,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/server-sitemap.xml`,
    ],
  },
};
