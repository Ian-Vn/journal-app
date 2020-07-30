import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { setError, removeError } from "../../actions/ui";
import { Register } from "../../actions/auth";

export const RegisterScreen = () => {

  // Uso del hook para el state de redux
  const dispatch = useDispatch();

  // Hook para tomar el valor del state del reducer, acepta un callback que devuelve el valor
  // del state que es asignado a la constante, aqui por ejemplo, el state son los states que devuelven 
  // los reducer, por ejemplo, state -> auth:{}, ui:{}, en este caso nos interesa el objeto uid que sera asignado
  // a la constante
  // const state = useSelector(state => state.ui)
  const { msgError } = useSelector(state => state.ui)

  // Usamos el custom hook para crear el state
  const [ values, handleInputChange ] = useForm({ name:'Ian', email:'correo1@correo.com', password:'123456', password2: '123456' });

  // se obtienen los valores del state
  const { name, email, password, password2  }  = values;

  const handleRegister = (e) => {
    e.preventDefault();  
    // Si el formulario es valido
    if (isFormValid() ) {
      console.log('Formulario invalido');
      dispatch( removeError() );
      dispatch(  Register(email, password, name) );
    }
  }

  // Funcion para hacer validaciones
  const isFormValid = () => {
    if ( name.trim().length === 0 ) {
      dispatch( setError( 'El nombre no puede ser vacio' ) );
      return false;
    } else if ( !validator.isEmail( email ) ) {
      dispatch( setError( 'El correo debe ser un correo valido' ) );
      return false 
    } else if ( password !== password2 || password.length < 5  ) {
      dispatch( setError( 'La contraseñas deber se iguales o la contraseña debe ser mayor a 5 caracteres' ) );
      return false;
    }
    // si no se cumple en ningun caso es decir que el formulario esta validado
    return true;
  }

  return (
    <Fragment>
      <h3 className="auth__title"> Register </h3>
      <form onSubmit = { handleRegister }>
        {
          msgError != null ? (  
            <div className="auth__alert-error">
              { msgError }
            </div>
          ): null
        }
        <input
          className="auth__input"
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="off"
          value = { name }
          onChange = {  handleInputChange }
        />

        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          value= { email }
          autoComplete="off"
          onChange = {  handleInputChange }
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value = { password }
          onChange = {  handleInputChange }
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm Password"
          name="password2"
          value = { password2 }
          onChange = {  handleInputChange }
        />
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Register
        </button>
        <Link className="link mt-5" to="/auth/login">
          Already registered?
        </Link>
      </form>
    </Fragment>
  );
};
