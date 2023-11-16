// import express from "express";
import { getContactsById } from "#repositiries/getContactsById.js";

// export const router = express.Router();

export async function showContacts(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactsById(contactId);
  if (contact) {
    res.status(200).json({ id: contactId, contact });
  } else {
    res.status(404).json({ massege: "Not found" });
  }
}
