import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(id) {
  const res = await fetch(`https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/posts?slug=${id}&_embed`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound()
  }

  return res.json();
}


export async function generateMetadata({ params }) {

  const post = await getData(params.id)
  return {
    title: post[0].title.rendered,
    // description: post.desc,
  };
}

const BlogPost = async ({ params }) => {
  const data = await getData(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data[0].title.rendered}</h1>
          <p className={styles.desc}>
            {data.desc}
          </p>
          <div className={styles.author}>
            <Image
              src={`${data[0].jetpack_featured_media_url}`}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data[0].title.rendered}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
              src={`${data[0].jetpack_featured_media_url}`}
              alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
         {data[0].title.rendered}
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
