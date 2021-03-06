import React from "react";

import {auth, createUserProfileDocument} from "../firebase/index";

export const UserContext = React.createContext({});

const UserContextProvider: React.FC<{children: JSX.Element}> = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = React.useState<null | Object>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  // console.log({user});

  React.useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // @ts-ignore
        const userRef = await createUserProfileDocument(userAuth);

        userRef?.onSnapshot((snapShot) => {
          setUser({
            //@ts-ignore
            id: snapShot.id,
            ...snapShot.data(),
          });
          setLoading(false);
        });
      } else {
        setUser(userAuth);
        setLoading(false);
      }
    });

    return () => unsubscribeFromAuth();
  }, []);

  const userContext = {user, loading};
  if (loading) {
    return <h2 style={{textAlign: "center"}}>Loading...</h2>;
  }
  return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
