const Sitemap = require('next-sitemap');

export default async function handler(req, res) {
  try {
    // Import your logic to fetch or generate dynamic URLs (replace with your implementation)
    const dynamicUrls = await getDynamicUrls(); // Replace with your function

    // Concatenate static and dynamic URLs (modify if you have statically defined URLs)
    const sitemapData = []; // Or your existing sitemap data
    sitemapData.push(...dynamicUrls);

    // Generate and write the updated sitemap
    await Sitemap.generate(sitemapData, '/sitemap.xml');

    res.status(200).json({ message: 'Sitemap updated successfully!' });
  } catch (err) {
    console.error('Error updating sitemap:', err);
    res.status(500).json({ message: 'Error generating sitemap' });
  }
}

// (Optional) Replace this with your logic to fetch or generate dynamic URLs
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