import Head from 'next/head';
import { client } from '../library/client';
import css from '../styles/Home.module.css';

import { PostCard, Navbar } from '../components';

export default function Home({ post_card }) {
  return (
    <div>
      <Head>
        <title>EoinDev Blog | Home</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <div className={css.contentContainer}>
        <div className={css.category}>
          <h1 className='text-lg font-bold'>Category</h1>
          {}
        </div>
        <div className='w-full'>
          <h1>Recent Post</h1>
          <ul className='flex flex-wrap justify-center gap-4'>
            {post_card?.map((post, index) => (
              <PostCard post={post} key={index} />
            ))}
          </ul>
        </div>
      </div>
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
  category->{
    name,
    slug,
  },
}`;

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
