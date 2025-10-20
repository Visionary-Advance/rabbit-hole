// Next.js will automatically generate sitemap.xml from this file

export default function sitemap() {
  const baseUrl = 'https://therabbitholeteabar.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
