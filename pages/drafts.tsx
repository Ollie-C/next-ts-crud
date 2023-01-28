import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Post, { PostProps } from "../components/Post";
import { prisma } from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user?.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <h1>My Drafts</h1>
        <p>You need to be authenticated to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {props.drafts.map((post) => (
            <div className="post" key={post.id}>
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Drafts;
