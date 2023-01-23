import styles from "../styles/Home.module.css";
import { GetStaticProps } from "next";
import Post, { PostProps } from "../components/Post";
import Header from "../components/Header";
import { prisma } from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Home: React.FC<Props> = (props) => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>Public Feed</h1>
        {props.feed.map((post) => (
          <div key={post.id} className={styles.post}>
            <Post post={post} />
          </div>
        ))}
      </main>
    </>
  );
};

export default Home;
