import React from "react";
import { Provider } from "react-redux";

import { AppRouter } from "./routers/AppRouter";
import { store } from "./store/store";

export const JournalApp = () => {
  return (
    // Se crea un provider para que este provea de datos a los componentes hijos, dicho dato sera la store
    <Provider store={ store }>
      <AppRouter />
    </Provider>
  );
};
