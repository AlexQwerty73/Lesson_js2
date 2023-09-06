import { posts, contacts, about } from "./pageInfo.js";
import { getHash } from "../utils/utils.js";

export function pageSinglePost() {
  const hash = getHash();
  const info = hash.slice(1).split('/');

  const dataName = info[0];
  const dataId = info[1];
  let body;

  if (dataName === 'posts') {
    const post = posts.find(r => r.id === Number(dataId));
    body = post ? post.body : 'Post not found';
  } else if (dataName === 'contacts') {
    const contact = contacts.find(r => r.id === Number(dataId));
    body = contact ? contact.body : 'Contact not found';
  } else if (dataName === 'about') {
    const aboutItem = about.find(r => r.id === Number(dataId));
    body = aboutItem ? aboutItem.body : 'About item not found';
  } else {
    body = '404';
  }

  return (
    `<h2>Single post</h2>
    <div id="${dataId}">${body}</div>
    `
  );
}
