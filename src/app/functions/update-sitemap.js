import { SitemapStream, streamToString } from 'next-sitemap';

export default async function handler(req, res) {
  try {
    // Fetch dynamic URLs from your data source (replace with your implementation)
    const posts = await getDynamicUrls();

    // Define sitemap data structure
    const sitemapData = posts.map((post) => ({
      loc: `https://your-domain.com/posts/${post.url}`, // Replace with your domain and URL structure
      lastmod:npost.lastmod||new Date(), // Use post's updatedAt if available, otherwise use current date
      changefreq: 'weekly', // Adjust frequency based on your content update rate
      priority: 0.7, // Adjust priority based on importance (0.1 to 1.0)
    }));

    // Create a sitemap stream
    const stream = new SitemapStream({ hostname: 'https://your-domain.com' }); // Replace with your domain

    // Add each URL to the stream
    sitemapData.forEach((url) => stream.write(url));

    // End the stream and write the sitemap to the response
    stream.end();
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(await streamToString(stream));
  } catch (err) {
    console.error('Error updating sitemap:', err);
    res.status(500).json({ message: 'Error generating sitemap' });
  }
}


async function getDynamicUrls() {
  // Implement your logic to fetch URLs from your AOI or other dynamic sources
  // (e.g., database queries, API calls)
  // Return an array of objects with the 'url' property for each URL
  // Example:
//   const response = await fetch('https://api.example.com/dynamic-urls');
//   const data = await response.json();
  const hardcodedUrls = [
    'hardcoded-url-1',
    'hardcoded-url-2',
    'hardcoded-url-3',
  ];
//   return data.map(item => ({ url: item.url }));
  return data.map(item => ({ url: hardcodedUrls,lastmod:new Date() }));
}