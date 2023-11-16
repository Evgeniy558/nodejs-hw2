import { listContacts } from "#repositiries/listContacts.js";

export async function indexContacts(req, res, next) {
  const contacts = await listContacts();
  res.status(200).json({ contacts, itemContacts: contacts.length });
}
