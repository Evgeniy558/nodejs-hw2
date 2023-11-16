import Joi from "joi";
import { addContact } from "#repositiries/addContact.js";

export async function createContacts(req, res, next) {
  const schemaIsRequired = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  const result = schemaIsRequired.validate(req.body);
  if (result.error) {
    res.status(400).json({ massege: result.error.message });
  } else {
    const { name, email, phone } = req.body;
    if (name && email && phone) {
      const newContact = await addContact(name, email, phone);
      res.status(201).json({ newContact, message: "post" });
    } else {
      res.status(404).json({ massege: "missing required name - field" });
    }
  }
}
