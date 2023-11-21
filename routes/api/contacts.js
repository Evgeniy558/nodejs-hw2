import express from "express";
import { updateContactsMangoDb } from "#controllers/updateContacts.js";
import { getAllTasksMangoDb } from "#controllers/indexContacts.js";
import { getContactMangoDb } from "#controllers/showContacts.js";
import { createContactMangoDb } from "#controllers/createContacts.js";
import { deleteContactMangoDb } from "#controllers/deleteContacts.js";
import { updateStatusContact } from "#controllers/updateStatusContact.js";
export const router = express.Router();

router.get("/", getAllTasksMangoDb);

router.get("/:contactId", getContactMangoDb);

router.post("/", createContactMangoDb);

router.delete("/:contactId", deleteContactMangoDb);

router.put("/:contactId", updateContactsMangoDb);

router.patch("/:contactId/favorite", updateStatusContact);
