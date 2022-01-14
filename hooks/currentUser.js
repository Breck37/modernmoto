import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { apiType } from "../constants";
import currentRound from "../constants/currentRound";

const CurrentUserContext = createContext({});

export const useCurrentUser = (user) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userWithNoAccess, setUserWithNoAccess] = useState(null);
  const apiRequests = apiType[currentRound.type];

  useEffect(() => {
    if (!currentUser && user) {
      setIsLoading(true);
      axios
        .get(
          `${apiRequests?.getUser}/${user?.email}?week=${currentRound.week}&type=${currentRound.type}`
        )
        .then(({ data }) => {
          setIsLoading(false);
          if (data.success) {
            setCurrentUser(data.user);
          }

          setUserWithNoAccess(data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("current user hook error:", { err });
        });
    }
  });

  return {
    currentUser,
    setCurrentUser,
    isLoading,
    userWithNoAccess,
  };
};

const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
