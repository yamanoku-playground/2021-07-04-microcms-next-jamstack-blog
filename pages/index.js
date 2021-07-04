import Link from "next/link";
import Head from 'next/head'
import { client } from "../libs/client";

export default function Home({ lists }) {
  return (
    <>
      <Head>
        <title>OSS活動記録</title>
      </Head>
      <main>
        <h1>OSS活動記録</h1>
        {lists.map((list) => (
          <article key={list.id}>
            <h2>{list.title}</h2>
            <div>{list.tag}</div>
            <div>{list.createdDate}</div>
            <div>
              <Link href={`/detail/${list.id}`} passHref>
                <a>Detail</a>
              </Link>
            </div>
          </article>
        ))}
      </main>
    </>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "activity",
    queries: {limit: 100, orders: 'createdDate'}
  });

  return {
    props: {
      lists: data.contents,
    },
  };
};
