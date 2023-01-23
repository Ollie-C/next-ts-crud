import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import { PostProps } from "../../components/Post";
import { prisma } from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: post,
  };
};

const Post: React.FC<PostProps> = (props) => {
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <div>
      <h2>{title}</h2>
      <p>By {props?.author?.name || "Anon"} </p>
      <ReactMarkdown children={props.content} />
    </div>
  );
};

export default Post;
