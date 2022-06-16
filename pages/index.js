import Head from 'next/head';
import { client } from '../library/client';
import styles from '../styles/Home.module.css';

export default function Home({ post_card }) {
  console.log(post_card);
  return (
    <div className={styles.container}>
      <Head>
        <title>EoinDev Blog | Home</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Hello World</h1>
    </div>
  );
}

export const getServerSideProps = async () => {
  const post = `*[_type == "post"]{
  author->{
  name,
 "image": image.asset->url,
  slug,
},
  slug,
  "image": mainImage.asset->url,
  short_description,
  title,
  featured_post,
  recommended_post,
  publishedAt,
}
`;

  const post_card = await client.fetch(post);

  if (!post_card) {
    return {
      error: true,
      data: [],
    };
  } else {
    return {
      props: {
        post_card,
      },
    };
  }
};
