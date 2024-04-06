import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

async function getData() {
  const res = await fetch("https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/posts?tags=606508198&_embed&per_page=4&orderby=date&order=desc", {
    // cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Blog = async () => {
  const data = await getData();
  // const img = "https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  // const img = "https://fama.b-cdn.net/Yuri%252Fcategory/abc.jpg"

  return (
    <div className={styles.mainContainer}>
      {data.map((item) => (
        <Link href={`/blog/${item.slug}`} className={styles.container} key={item.id}>
          <div className={styles.imageContainer}>
            <Image
              // src={"https://fama.b-cdn.net/Yuri/Products/20230808144008.jpg"}
              src={`${item.jetpack_featured_media_url}`}
              // src={img}
              alt="Home Image"
              width={400}
              height={250}
              className={styles.image}
              // priority = {true}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title.rendered }</h1>
            <p className={styles.desc}>{item.title.rendered}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};


export default Blog;
