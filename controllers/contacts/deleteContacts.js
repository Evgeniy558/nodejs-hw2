import { removeContactMangoDb } from "#modelcontacts/contacts.js";

export const deleteContactMangoDb = async (req, res, next) => {
  try {
    const result = await removeContactMangoDb(req.params.contactId);
    if (result) {
      res.status(200).json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    next(err);
  }
};
