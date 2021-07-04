import Link from "next/link";
import Head from 'next/head'
import { client } from "../../libs/client";

export default function DetailId({ detail }) {
  return (
    <>
      <Head>
        <title>{detail.title}</title>
      </Head>
      <main>
        <h1>{detail.title}</h1>
        <div>{detail.tag}</div>
        <div>{detail.createdDate}</div>
        <div>
          <a href={detail.url} target="_blank">Detail Link</a>
        </div>
        {detail.details ? (
          <div
            dangerouslySetInnerHTML={{
              __html: `${detail.details}`,
            }}
          />
        ) : ""}
        </main>
        <footer>
            <div>
                <Link href="/" passHref>
                    <a>Top</a>
                </Link>
            </div>
        </footer>
    </>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({
    endpoint: "activity",
    queries: {limit: 100, orders: 'createdDate'}
  });

  const paths = data.contents.map((content) => `/detail/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "activity", contentId: id });
  return {
    props: {
      detail: data,
    },
  };
};