import { listContactsMangoDb } from "#modelcontacts/contacts.js";

export async function getAllTasksMangoDb(req, res, next) {
  try {
    const contacts = await listContactsMangoDb();
    if (contacts) {
      res.status(200).json({ contacts, itemContacts: contacts.length });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}
