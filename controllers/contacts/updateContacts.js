import { updateContactMangoDb } from "../../models/contacts.js";

// this controller is using for work with MangoDB
export const updateContactsMangoDb = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await updateContactMangoDb(contactId, req.body);
    if (!result) {
      next();
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};
