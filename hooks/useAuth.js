import useSWR from "swr";

function fetcher(route) {
  /* our token cookie gets sent with this request */
  return fetch(route)
    .then((r) => r.ok && r.json())
    .then((user) => user || null);
}

export default function useAuth() {
  let dbUser = {};
  const { data: user, error } = useSWR("/api/user", fetcher);
  const loading = user === undefined;

  // if(user) {
  //   dbUser = axios
  //   .get(`${process.env.API_URL}/get-user`)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => console.error('/get-user error', error));
  // }

  return {
    user: {
      ...user,
      ...dbUser,
    },
    loading,
    error,
  };
}
