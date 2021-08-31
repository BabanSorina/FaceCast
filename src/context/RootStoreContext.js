import React from 'react';
/// to use mobx 

const RootStoreContext = React.createContext(null);

const RootStoreProvider  = props => (
  <RootStoreContext.Provider value={props.rootStore}>
    {props.children}
  </RootStoreContext.Provider>
);

const useRootStore = () => {
  const store = React.useContext(RootStoreContext);

  if (!store) {
    throw new Error('Forget to use the RootStoreProvider');
  }

  return store;
};

export { RootStoreContext, RootStoreProvider, useRootStore };