import { posts } from "./pageInfo.js";

export function pagePosts() {
  const POSTS = posts.map(({ id, body }) => `<div id="${id}">${body}</div>`).join('');
  return (
    `<div class="posts">
      <h2>Posts</h2>
      ${POSTS}
    </div>`
  );
}