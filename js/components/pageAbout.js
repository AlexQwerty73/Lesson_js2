import { about } from "./pageInfo.js";

export function pageAbout() {
  const ABOUT = about.map(({ id, body }) => `<div id="${id}">${body}</div>`).join('');
  return (
    `<div class="About">
      <h2>About</h2>
      ${ABOUT}
    </div>`
  );
}