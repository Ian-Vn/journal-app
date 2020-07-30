import React, { useEffect, useRef } from "react";
import { NotesAppBar } from "./NotesAppBar";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { activeNote, startDeleting } from "../../actions/notes";

export const NoteScreen = () => {

  const { active:note } = useSelector(state => state.notes);

  // dispatch para actualizar el estado en redux
  const dispatch = useDispatch();
  // se utiliza el hook para realizar la actualizacion de los campos pasandole como argumento 
  // el estado inicial el state de redux cuando se cargan los datos
  const [formValues, handleInputChange, reset] = useForm(note);
  const { body, title, id } = formValues;

  // useref para poder mutar dicha variable sin redibujar el componente, esto almacena la primera vez al id que se dibuja por primera vez
  const activeId = useRef(note.id);
  // efecto para cambiar el form cuando cambia la nota
  useEffect(() => {
    // entonces cuando se cambie de nota se verifica que la nota.id sea diferente del activeID que esta apuntando al antiguo id
    if ( note.id !== activeId.current ) {
      // se resetea el valor del form
      reset( note );
      // se actualiza la referencia al elemento apuntado
      activeId.current = note.id;
    }
  }, [note, reset])

  // useeffect para guardar el state en redux cuando se cambian los inputs
  useEffect(() => {
    dispatch( activeNote( formValues.id, { ...formValues } ) )
  }, [formValues,dispatch])

  const handleDelete = () => {
    dispatch( startDeleting( id ));
  }

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          name = "title"
          className="notes__title-input"
          type="text"
          placeholder="Some awesome title"
          autoComplete="off"
          value = { title }
          onChange = { handleInputChange }
        />
        <textarea
          name = "body"
          className="notes__text-area"
          placeholder="What happened today?"
          value = { body }
          onChange = { handleInputChange }
        ></textarea>

       { 
          (note.url) && (
            <div className="notes_image">
            <img 
                src={ note.url }
                alt="Imagen"/>
        </div>
          )
        }
      </div>
      <button className="btn btn-danger" onClick = { handleDelete }>
        Delete
      </button>
    </div>
  );
};
