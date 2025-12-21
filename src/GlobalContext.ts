import React from "react";

interface IContext {
  myState: string;
  myFunction: (myState: string) => void;
}

export const myGlobalContext = React.createContext<IContext>({
  myState: "",
  myFunction: () => {},
});
