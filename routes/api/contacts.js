import express from "express";
import { updateContactsMangoDb } from "#controllers/updateContacts.js";
import { getAllTasksMangoDb } from "#controllers/indexContacts.js";
import { getContactMangoDb } from "#controllers/showContacts.js";
import { createContactMangoDb } from "#controllers/createContacts.js";
import { deleteContactMangoDb } from "#controllers/deleteContacts.js";
import { updateStatusContact } from "#controllers/updateStatusContact.js";
export const router = express.Router();

router.get("/", getAllTasksMangoDb);
// router.get("/", indexContacts) - use for work with database on serwer;

router.get("/:contactId", getContactMangoDb);
// router.get("/:contactId", showContacts); - use for work with database on serwer;

router.post("/", createContactMangoDb);
// router.post("/", createContacts); - use for work with database on serwer;

router.delete("/:contactId", deleteContactMangoDb);

// router.delete("/:contactId", deleteContacts);- use for work with database on serwer;

router.put("/:contactId", updateContactsMangoDb);

router.patch("/:contactId/favorite", updateStatusContact);
