import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import { PostProps } from "../../components/Post";
import { useSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const validSession = Boolean(session);
  const postIsUsers = session?.user?.email === props.author?.email;

  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <div>
      <h2>{title}</h2>
      <p>By {props?.author?.name || "Anon"} </p>
      <ReactMarkdown children={props.content} />
      {!props.published && validSession && postIsUsers && (
        <button onClick={() => publishPost(props.id)}>Publish</button>
      )}
    </div>
  );
};

export default Post;
