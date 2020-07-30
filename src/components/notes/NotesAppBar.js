import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector( state => state.notes );

    const handleSave = () => {
        dispatch( startSaveNote( active ) );
    }

    const handlePicture = () => {
        // Simula el click hacia el input por el cual se ejecuta la funcion de change ya que este input cmabia
        document.querySelector("#fileSelector").click();
    }

    const handleFileChange = (e) => {
        // se obtiene el file
        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploading(file) );
        }
    }

    return (
        <div className="notes__appbar">
            <span> 28 de agosto de 2020 </span>

            <input id = "fileSelector" name = "file" type="file" style ={{ display: 'none' }} onChange = { handleFileChange } />
            <div>
                <button className="btn" onClick = { handlePicture }>
                    Picture
                </button>
                <button className="btn" onClick = { handleSave }>
                    Save
                </button>
            </div>
        </div>
    )
}
