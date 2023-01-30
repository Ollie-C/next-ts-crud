import { prisma } from "../../../lib/prisma";

export default async function handle(req: any, res: any) {
  const postId = req.query.id;
  const post = await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });
  res.json(post);
}
