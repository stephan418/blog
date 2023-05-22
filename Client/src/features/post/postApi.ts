const host_url = "http://localhost:5000";

export function fetchPostsApi() {
  return fetch(`${host_url}/api/post`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Could not fetch posts");
      }
      return res;
    })
    .then((res) => res.json());
}
