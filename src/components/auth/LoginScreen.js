import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { startLogin, startGoogleLogin } from "../../actions/auth";

export const LoginScreen = () => {

  // Hook para manejar el dispatch
  const dispatch = useDispatch();

  // Hook para obtener el valor del state de loading
  const { loading } = useSelector(state => state.ui );

  // State para el formulario
  const [formValues, handleInputChange] =  useForm({ email: '' , password: '' });

  const { email, password} = formValues;

  // funcion para controlar el submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Actualizamos el state del reducer con el dispatch, sincrono
    // dispatch( login( 123, 'Ian' ) );
    // Dispatch asincrono
    dispatch(  startLogin( email, password ) );

  } 

  const handleGoogleLogin = () => {
    dispatch( startGoogleLogin() )
  }

  return (
    <Fragment>
      <h3 className="auth__title"> Login </h3>
      <form onSubmit = { handleSubmit }>
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value = { email }
          onChange ={ handleInputChange }
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={ password }
          onChange = { handleInputChange }
        />
        <button className="btn btn-primary btn-block" type="submit" disabled={ loading } > Login </button>
        <div className="auth__social-networks">
          <p> Login with social networks </p>
          <div className="google-btn" onClick={ handleGoogleLogin } >
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link className="link" to="/auth/register">Create new account</Link>
      </form>
    </Fragment>
  );
};
