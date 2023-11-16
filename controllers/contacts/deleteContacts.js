import { removeContact } from "#repositiries/removeContact.js";

export async function deleteContacts(req, res, next) {
  const { contactId } = req.params;
  const isDeleted = await removeContact(contactId);
  if (isDeleted) {
    res.status(200).json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}
