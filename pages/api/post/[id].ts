import { prisma } from "../../../lib/prisma";

export default async function handle(req: any, res: any) {
  const postId = req.query.id;
  if (req.method === "DELETE") {
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not support at this route.`
    );
  }
}
