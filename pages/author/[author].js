import React from 'react';
import { client } from '../../library/client';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Author = ({ result }) => {
  console.log(result);
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading</div>;
  } else {
    return <div></div>;
  }
};

export default Author;

export const getStaticPaths = async () => {
  const query = `*[_type == "author"]{
  slug{
  current,
}
}`;

  const query_paths = await client.fetch(query);

  const paths = query_paths.map((path) => ({
    params: {
      author: path.slug.current,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { author } }) => {
  const query = `*[_type == "author" && slug.current == "${author}"]{
  name,
  slug,
  "image": image.asset->url,
  bio,
  _id,
  "post": *[_type == "post" && author->._id == ^._id][]{
  author->,
  slug,
  "image": mainImage.asset->url,
  category->,
  body,
  title,
  featured_post,
  recommended_post,
  publishedAt,
}
}`;

  const result = await client.fetch(query);

  if (!result) {
    return {
      error: true,
      data: [],
    };
  } else {
    return {
      props: {
        result,
      },
      revalidate: 10,
    };
  }
};
