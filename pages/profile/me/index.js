import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useAuth } from "../../../hooks";
import { useCurrentUser } from "../../../hooks/currentUser";

const Me = () => {
  const { user, loading: userLoading } = useAuth();
  const { currentUser } = useCurrentUser(user);

  if (userLoading || !currentUser) {
    return <CircularProgress />;
  }
  console.log({ currentUser });
  return <Presentation user={currentUser} />;
};

const Presentation = ({ user }) => {
  console.log({ user });
  return (
    <div>
      {user.username}
      {/* <section>
        <div className="history">
          Picks
          <div>
            {user.picks.map((pick) => {
              console.log({ pick });
              return (
                <div
                  key={`${pick.user}_${pick.year}_${pick.type}_${pick.week}`}
                >
                  <span>{pick.rank}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section>
        <div className="leagues">
          league
          <div>
            {user.leagues.map((league) => {
              return <span key={league}>{league}</span>;
            })}
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Me;
