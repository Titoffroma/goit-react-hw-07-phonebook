import { createAction } from '@reduxjs/toolkit';
import { addContactToAPI, removeContactFromAPI } from '../API';

const types = {
  FETCH_CONTACTS: 'contacts/fetch',
  ADD_CONTACT: 'contact/add',
  REMOVE_CONTACT: 'contact/remove',
  FILTER_CONTACT: 'contact/filter',
  ADD_MESSAGE: 'message/add',
  CLEAR_MESSAGE: 'message/clear',
  SET_LOADING_STATE: 'loading-state/set',
};

const fetchContacts = createAction(types.FETCH_CONTACTS);

const addContact = contact => dispatch => {
  dispatch({
    type: types.SET_LOADING_STATE,
    payload: true,
  });
  addContactToAPI(contact)
    .then(data => {
      if (!data.error) {
        dispatch({
          type: types.ADD_CONTACT,
          payload: data,
        });
        dispatch({
          type: types.ADD_MESSAGE,
          payload: { success: `${data.name} successfully added` },
        });
      }
      data.error &&
        dispatch({
          type: types.ADD_MESSAGE,
          payload: { error: data.error },
        });
    })
    .catch(error =>
      dispatch({
        type: types.ADD_MESSAGE,
        payload: { error: error.message },
      }),
    )
    .finally(() => {
      dispatch({
        type: types.SET_LOADING_STATE,
        payload: false,
      });
    });
};

const removeContact = id => dispatch => {
  dispatch({
    type: types.SET_LOADING_STATE,
    payload: true,
  });
  removeContactFromAPI(id)
    .then(data => {
      if (!data.error) {
        dispatch({ type: types.REMOVE_CONTACT, payload: id });
        dispatch({
          type: types.ADD_MESSAGE,
          payload: { success: `Successfully removed` },
        });
      }
      data.error &&
        dispatch({
          type: types.ADD_MESSAGE,
          payload: { error: data.error },
        });
    })
    .catch(error =>
      dispatch({
        type: types.ADD_MESSAGE,
        payload: { error: error.message },
      }),
    )
    .finally(() => {
      dispatch({
        type: types.SET_LOADING_STATE,
        payload: false,
      });
    });
};

const filterContacts = createAction(types.FILTER_CONTACT);

const addMessage = createAction(types.ADD_MESSAGE);

const clearMessage = createAction(types.CLEAR_MESSAGE);

const setLoadingState = createAction(types.SET_LOADING_STATE);

export {
  types,
  fetchContacts,
  addContact,
  removeContact,
  filterContacts,
  addMessage,
  clearMessage,
  setLoadingState,
};
