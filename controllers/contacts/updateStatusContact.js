import { updateStatusContactMangoDb } from "../../models/contacts.js";

export const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    if (Object.keys(req.body).length !== 0) {
      const result = await updateStatusContactMangoDb(contactId, req.body);
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: "missing field favorite" });
    }
  } catch (err) {
    next(err);
  }
};
