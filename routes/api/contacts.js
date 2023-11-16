import express from "express";
import { updateContactsController } from "#controllers/updateContacts.js";
import { indexContacts } from "#controllers/indexContacts.js";
import { showContacts } from "#controllers/showContacts.js";
import { createContacts } from "#controllers/createContacts.js";
import { deleteContacts } from "#controllers/deleteContacts.js";

export const router = express.Router();

router.get("/", indexContacts);

router.get("/:contactId", showContacts);

router.post("/", createContacts);

router.delete("/:contactId", deleteContacts);

router.put("/:contactId", updateContactsController);
