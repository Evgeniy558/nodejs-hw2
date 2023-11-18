import { getContactByIdMangoDb } from "../../models/contacts.js";

// this controller is using for work with MangoDB
export async function getContactMangoDb(req, res, next) {
  try {
    const contact = await getContactByIdMangoDb(req.params.contactId);
    console.log(contact);
    if (contact) {
      res.status(200).json({ ...contact.toObject() });
    } else {
      next(); // 404 error
    }
  } catch (err) {
    next(err);
  }
}
