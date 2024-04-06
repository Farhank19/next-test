export const revalidate = 30
 
export async function GET() {

  const url =  await getURL();
  return new Response(`<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
  ${url||""}
  </urlset>`, { headers: { "Content-Type": "text/xml" } })
}


export default async function getURL() {
  try {
    const paths = ["/"];
    const posts = await fetchAllPosts(
      "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/posts?&_embed"
    );

    posts.forEach((post) => {
      paths.push(`/${post._embedded["wp:term"][0][0].slug}/${post.slug}`);
    });

    return paths.map(item => {    
      return `
    <url>
      <loc>https://www.fktest.com${item}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    `;
    }).join('');;
  } catch (error) {
    console.error("Error generating sitemap:", error.message);
    return `
    <url>
      <loc>https://www.fktest.com/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    `;
  }
}

export async function fetchAllPosts(url, posts = []) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const newposts = await response.json();
    if (newposts.length === 0) {
      return posts;
    }

    posts = posts.concat(newposts);

    const nextPageUrl = getNextPageUrl(response.headers.get("link"));

    if (nextPageUrl) {
      return fetchAllPosts(nextPageUrl, posts);
    } else {
      return posts;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

function getNextPageUrl(linkHeader) {
  if (!linkHeader) {
    return null;
  }

  const links = linkHeader.split(",");
  for (const link of links) {
    const match = link.match(/<([^>]+)>;\s*rel="next"/);
    if (match) {
      return match[1];
    }
  }

  return null;
}
