import { createReducer, configureStore } from '@reduxjs/toolkit';

import { removeContactByID } from './contacts-selectors';

import {
  types,
  fetchContacts,
  filterContacts,
  setLoadingState,
} from './actions';

const items = [];

const InitialState = {
  contacts: {
    items,
    filter: '',
  },
  isLoading: false,
  message: {
    error: false,
    success: false,
  },
};

const reducer = createReducer(InitialState, {
  [fetchContacts]: (state, action) => {
    state.contacts.items = action.payload;
  },
  [types.ADD_CONTACT]: (state, action) => {
    if (action.payload) {
      state.contacts.items.push(action.payload);
    } else return state;
  },
  [types.ADD_MESSAGE]: (state, action) => {
    state.message = action.payload;
  },
  [types.CLEAR_MESSAGE]: state => {
    state.message = { error: false, succes: false };
  },
  [types.REMOVE_CONTACT]: (state, action) => {
    state.contacts.items = removeContactByID(state, action.payload);
  },
  [filterContacts]: (state, action) => {
    state.contacts.filter = action.payload;
  },
  [setLoadingState]: (state, action) => {
    state.isLoading = action.payload;
  },
});

const thunk = ({ dispatch, getState }) => next => action =>
  typeof action === 'function' ? action(dispatch, getState) : next(action);

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});

export default store;
