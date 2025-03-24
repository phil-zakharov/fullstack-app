import { postController } from '#controllers/post/index.ts';
import { Route } from '#routes/types.ts';

export const postRoutes: Route = {
  posts: {
    GET: postController.getAllPosts
  }
}