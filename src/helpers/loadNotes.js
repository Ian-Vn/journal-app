import { db } from "../firebase/firebase-config"


export const loadNotes = async ( uid) => {
    // se hace la conexion a la coleccion del usuario
    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();

    // arreglo vacio
    const notes = [];

    // Se realiza el ciclo para recorrer los documentos
    notesSnap.forEach( snapHijo => {
        // por cada elemento creado
        notes.push({ id: snapHijo.id, ...snapHijo.data()  })
    } );

    // Se regresan las notas
    return notes;
}