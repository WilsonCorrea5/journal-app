import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    savingMessage: "",
    notes: [],
    active: null,
    // active: {
    //     id:'',
    //     title:'',
    //     body: '',
    //     date: 1011993,
    //     imageUrl: []
    // }
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.savingMessage = "";
    },
    setNote: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.savingMessage = "";
    },
    updateNotes: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });

      state.savingMessage = `${action.payload.title} Was successfully updated `;
    },
    setImagesToActiveNote: (state, action) => {
      state.active.imageURL = [...state.active.imageURL, ...action.payload];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.savingMessage = "";
      state.notes = [];
      state.active = null;
    },
    deleteNotesById: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNote,
  setSaving,
  updateNotes,
  setImagesToActiveNote,
  clearNotesLogout,
  deleteNotesById,
} = journalSlice.actions;
