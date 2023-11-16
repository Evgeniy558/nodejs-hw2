import Joi from "joi";
import { updateContacts } from "#repositiries/updateContacts.js";

export async function updateContactsController(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(2).max(30),
    email: Joi.string().email(),
    phone: Joi.string(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({ massege: result.error.message });
  } else {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    if (name || email || phone) {
      const updatedConact = await updateContacts(contactId, req.body);
      if (updatedConact) {
        res.status(200).json({ updatedConact, message: "updated" });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } else {
      res.status(400).json({ message: "missing fields" });
    }
  }
}
