const host_url = "http://localhost:5000";

export function fetchToken(username: string, password: string) {
  return fetch(`${host_url}/api/session`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: new Headers({ "Content-Type": "application/json" }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error authenticating");
      }
      return res;
    })
    .then((res) => res.text());
}

export function createAccount(username: string, password: string) {
  return fetch(`${host_url}/api/account`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: new Headers({ "Content-Type": "application/json" }),
  });
}
