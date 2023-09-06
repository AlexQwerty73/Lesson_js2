import { contacts } from "./pageInfo.js";

export function pageContacts() {
  const CONTACTS = contacts.map(({ id, body }) => `<div id="${id}">${body}</div>`).join('');
  return (
    `<div class="contacts">
      <h2>Contacts</h2>
      ${CONTACTS}
    </div>`
  );
}