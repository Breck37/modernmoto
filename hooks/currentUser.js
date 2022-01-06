import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import currentRound from "../constants/currentRound";

const CurrentUserContext = createContext({});

export const useCurrentUser = (user) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  console.log({ currentUser, user });
  useEffect(() => {
    if (!currentUser && user?.email) {
      axios
        .get(
          `/api/get-user/${user.email}?year=${currentRound.year}&type=${currentRound.type}&week=${currentRound.week}`
        )
        .then(({ data }) => {
          if (data.success) {
            setCurrentUser(data.user);
          }
        })
        .catch((err) => console.log("current user hook error:", { err }));
    }
  });

  return { currentUser, setCurrentUser };
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
