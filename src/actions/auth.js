import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebase-config"
import { startLoading, finishLoading } from "./ui";
import Swal from "sweetalert2";
import { noteLogout } from "./notes";

// Funcion que exporta un objeto, dicho objeto es a accion a ejecutar en el reducer
export const login = ( uid, displayName ) => (
    {  
        type: types.login,
        payload: {
            uid, displayName
        }
    }
);


// Para el logout
export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(  logout());
        dispatch( noteLogout() )
    }
}

export const logout = () => ({ type: types.logout })

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        // firebase.auth().signInWithPopup( googleAuthProvider  ).then( userCred => console.log(userCred) );
        firebase.auth().signInWithPopup( googleAuthProvider ).then(  ({ user }) => dispatch( login( user.uid, user.displayName ) ) );
    }
}


// Peticion asincrona
export const startLogin = (email, password) => {
    // Para denotar que una tarea asincrona se va a ejecutar se devuleve un callback
    return ( dispatch ) => {
        dispatch( startLoading()  );
        firebase.auth().signInWithEmailAndPassword( email, password )
        .then( ( { user } ) => {
            dispatch( login(  user.uid, user.displayName )  )
            dispatch( finishLoading() )
        })
        .catch( error => {
            dispatch( finishLoading() )
            Swal.fire('Error', error.message, 'error');
        } );
    }
}

// Funcion para realizar el registro
export const Register = ( email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
        .then( async ({ user }) => {
           // esta funcion crea un usuario en firebase, por lo cual se recibe la informacion del usuario creado
           // despues actualizamos su name con el valor del name
           await user.updateProfile({ displayName: name} )
           // el objeto user ha sido actualizado, entonces hacemos el dispatch del usuario, esto acutaliza el state del usuario
           dispatch( login( user.uid, user.displayName ) )
        } ).catch( error => console.log(error) );
    }
}