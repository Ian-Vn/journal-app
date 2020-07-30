import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "../components/journal/JournalScreen";

import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../actions/notes";

// Archivo de rutas principales
export const AppRouter = () => {

  // hook para usar el dispatch
  const dispatch = useDispatch();

  // Hook para la revision si se resolvio la autenticacion o no, es decir, cada vez que se logea, se hara una notificacion, esa notificacion
  // servira  para cambiar de state
  // state para definir cuando se termino de checar la autenticacion
  const [checking, setChecking] = useState(true);
  // state para indicar cuando inicio la autenticacion
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // La primera vez que se ejecuta este componente se hace la subscripcion hacia el observble
  // que verifica si la autenticacion ha cambiado
  useEffect(() => {
    // Cuando se monta el componente se suscribe al observable, esto se guarda en memoria y cada vez que cambie,
    // autenticacion se ejecuta el callback del metodo  onAuthStateChanged
    firebase.auth().onAuthStateChanged( async(user) => {
      // esto se ejecuta cada vez que cambia la autenticacion
      // si existe el usuario al autenticarse, es decir, cambio de usuario o se autentico
      if ( user?.uid ) {
        dispatch( login( user.uid, user.displayName ) );
        // bandera para acticar la autenticacion
        setIsLoggedIn( true );
        dispatch(startLoadingNotes( user.uid ));
        // se ejecuta el dispatch 
      } else {
        // si no se ha autenticado
        setIsLoggedIn( false);
      }
      // Se termino la verificacion del checkeo
      setChecking( false );
    } )
  }, [dispatch])

  if ( checking ) {
    return <h2>Wait...</h2>
  }

  return (
    <Router>
      <Switch>
        <PublicRoute path="/auth" component={AuthRouter} isLoggedIn = { isLoggedIn } />
        {/* Ruta privada */}
        <PrivateRoute exact path="/" component={JournalScreen} isLoggedIn = { isLoggedIn } /> 
        {/* <Route exact path="/" component={JournalScreen} /> */}
        <Redirect to="/auth/login" />
      </Switch>
    </Router>
  );
};
