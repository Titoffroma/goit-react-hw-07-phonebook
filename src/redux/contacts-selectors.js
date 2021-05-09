import { createSelector } from 'reselect';

export const getContactsList = store => store.contacts.items;

export const getContactsFilter = store => store.contacts.filter;

export const getMessage = store => store.message;

export const removeContactByID = createSelector(
  [(state, id) => id, getContactsList],
  (id, list) => list.filter(contact => contact.id !== id),
);
