import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteNotesById,
  savingNewNote,
  setActiveNote,
  setImagesToActiveNote,
  setNote,
  setSaving,
  updateNotes,
} from "./journalSlice";
import { loadNotes } from "../../journal/helpers/loadNotes";
import { fileUpload } from "../../journal/helpers/fileUpload";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      imageURL: [],
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);
    newNote.id = newDoc.id;
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("User not found");
    const notes = await loadNotes(uid);
    console.log(notes);
    dispatch(setNote(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });

    dispatch(updateNotes(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());
    // await fileUpload(files[0]);
    const fileUploadPromise = [];
    for (const file of files) {
      fileUploadPromise.push(fileUpload(file));
    }
    const photosUrls = await Promise.all(fileUploadPromise);
    console.log(photosUrls);
    dispatch(setImagesToActiveNote(photosUrls));
  };
};
export const startDeleteNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);
    dispatch(deleteNotesById(note.id));
  };
};
