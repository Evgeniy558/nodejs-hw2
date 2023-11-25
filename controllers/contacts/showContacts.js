import { getContactByIdMangoDb } from "#modelcontacts/contacts.js";

export async function getContactMangoDb(req, res, next) {
  try {
    const contact = await getContactByIdMangoDb(req.params.contactId);
    console.log(contact);
    if (contact) {
      res.status(200).json({ ...contact.toObject() });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}
