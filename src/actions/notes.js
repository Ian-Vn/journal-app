import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () => {
    // getstate es una funcion que permite tener acceso al state de un reducer
    return async (dispatch, getState) => { 
        // obtenemos el state
        const { uuid } = getState().auth;
        // creamos una nota
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        // Obtenemos una referencia a firestore
        const doc = await db.collection(`${ uuid }/journal/notes`).add( newNote );

        // se realiza el dispatch hacia el reducer
        dispatch( activeNote( doc.id, newNote ) );
        dispatch( addNewNote(doc.id, newNote) );
    }
}

export const activeNote = ( id, note) => ({ type: types.notesActive, payload: { id, ...note }  })
export const addNewNote =(id, note) => ({ type: types.notesAddNew, payload: { id, ...note } })
export const setNote = (notes) => ({ type: types.notesLoad, payload: notes });

// funcion de optimizacion
export const startLoadingNotes = (uid) => {
    return async( dispatch) => {
        const notes = await loadNotes( uid );
        dispatch( setNote( notes ) );
    }
}

// Funcion para guardar la nota en firebase
export const startSaveNote = ( note ) => {
    return async(dispatch, getState) => {
        const { uuid } = getState().auth;

        if( !note.url ) {
            delete note.url;
        }
        // se clona el documento
        const noteToFirestore = { ...note }
        // se elimina
        delete noteToFirestore.id;
        await db.doc(`${uuid}/journal/notes/${note.id}`).update(noteToFirestore);
        dispatch( refreshNotes( note.id, note ) );
        Swal.fire('Saved', note.title, 'success' );
    }
}

export const refreshNotes = (id, note) => ( {  type: types.notesUpdated, payload: { id, note: { id, ...note  } } } );

// Accion para subir la imagen
export const startUploading = (file) => {
    return async(dispatch, getState) => {
        const { active:activeNote } = getState().notes;
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => { Swal.showLoading(); }
        })
        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;
        dispatch( startSaveNote( activeNote ) );
        Swal.close();
    }
}

// funcion para borrar
export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const uuid = getState().auth.uuid;
        await db.doc(`${uuid}/journal/notes/${id}`).delete();
        dispatch( deleteNote(id) );
    }
}

// objeto para borrar una nota
export const deleteNote = (id) => ({ type:types.notesDelete, payload: id });

// funcion para resetar las notas al hacer logout
export const noteLogout = () => ({ type: types.notesLogoutCleaning })