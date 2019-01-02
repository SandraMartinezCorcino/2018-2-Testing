// import { db } from './config.js';
import firebase from './config.js';

export const addNote = (textNewNote) =>
  firebase.firestore().collection('notes').add({
    title: textNewNote,
    state: false
  })

export const deleteNote = (idNote) =>
  firebase.firestore().collection('notes').doc(idNote).delete()

export const updateNote = (idNote, note) =>
  firebase.firestore().collection('notes').doc(idNote).update(note)

export const getNotes = (callback) =>
  firebase.firestore().collection('notes')
    .onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
      });
      callback(data);
    }); 

export const getCollectionNotes = () =>
  firebase.firestore().collection('notes').get()
    .then((querySnapshot) => {
      const notes = [];
      querySnapshot.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data()});
      });
      return notes;
    });
