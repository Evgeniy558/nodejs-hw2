import { listContactsMangoDb } from "../../models/contacts.js";

// this controller is using for work with MangoDB
export async function getAllTasksMangoDb(req, res, next) {
  try {
    const contacts = await listContactsMangoDb();
    if (contacts) {
      res.status(200).json({ contacts, itemContacts: contacts.length });
    } else {
      next(); // 404 error
    }
  } catch (err) {
    next(err);
  }
}
