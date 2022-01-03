import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import React from "react";
import { LeagueStyled } from "../../styles";

const Leagues = () => {
  const router = useRouter();

  const handleNavigateToJoin = () => {
    router.push("/leagues/join");
  };
  return (
    <LeagueStyled>
      <h1 className="title">Leagues</h1>
      <div className="header"></div>
      <Button
        size="large"
        variant="contained"
        color="primary"
        className="create-button"
        onClick={handleNavigateToJoin}
      >
        Join
      </Button>
      <Button
        size="large"
        variant="contained"
        color="primary"
        className="create-button"
      >
        Create League
      </Button>
    </LeagueStyled>
  );
};

export default Leagues;
