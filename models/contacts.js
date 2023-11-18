import { Contacts } from "./Contact.js";

export const addContactMangoDb = async (name, email, phone, favorite) =>
  Contacts.create({ name, email, phone, favorite });

export const listContactsMangoDb = async () => Contacts.find();

export const getContactByIdMangoDb = async (contactId) =>
  Contacts.findById(contactId);

export const removeContactMangoDb = async (contactId) => {
  try {
    const deletedContact = await Contacts.findOneAndDelete({ _id: contactId });
    return deletedContact;
  } catch (err) {
    throw err;
  }
};

export const updateContactMangoDb = async (contactId, toUpdate) => {
  try {
    const updatedContact = await Contacts.findOneAndUpdate(
      { _id: contactId },
      toUpdate,
      {
        new: true,
        upsert: true,
      }
    );
    return updatedContact;
  } catch (err) {
    throw err;
  }
};

export const updateStatusContactMangoDb = async (contactId, toUpdate) => {
  try {
    const updatedContact = await Contacts.updateOne(
      { _id: contactId },
      toUpdate,
      {
        new: true,
      }
    );
    return updatedContact;
  } catch (err) {
    throw err;
  }
};
