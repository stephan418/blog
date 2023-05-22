const host_url = "http://localhost:5000";

export function fetchProfilesApi() {
  return fetch(`${host_url}/api/profile`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Could not fetch profiles");
      }
      return res;
    })
    .then((res) => res.json());
}
