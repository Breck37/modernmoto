import axios from "axios";

export default (req, res) => {
  const {
    email,
    smallBikePicks,
    bigBikePicks,
    week,
    totalPoints,
    league,
    user,
    type,
    season,
    round,
    deadline,
  } = JSON.parse(req.body);
  const userPick = JSON.stringify({
    week,
    round,
    email,
    user,
    smallBikePicks,
    bigBikePicks,
    totalPoints,
    league,
    type,
    season,
    deadline,
  });

  return axios
    .post(`${process.env.API_URL}/save-picks`, userPick, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      res.status(200).json(response.data);
      return response.data;
    })
    .catch((error) => console.error("/save-picks error", error));
};
