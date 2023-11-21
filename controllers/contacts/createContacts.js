import { addContactMangoDb } from "#modelcontacts/contacts.js";

export const createContactMangoDb = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  try {
    const newContact = await addContactMangoDb(name, email, phone, favorite);
    res.status(200).json(newContact);
  } catch (err) {
    next(err);
  }
};
