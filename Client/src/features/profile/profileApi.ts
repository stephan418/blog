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

export function fetchProfileApi(id: string) {
  return fetch(`${host_url}/api/profile/${id}`).then(async (res) => {
    if (!res.ok) {
      throw new Error("Could not fetch profiles");
    }

    return await res.json();
  });
}

interface Profile {
  name: string;
  description?: string;
  pictureId?: string;
}

export async function createProfile(profile: Profile, token: string) {
  const body = JSON.stringify(profile);

  return fetch(`${host_url}/api/profile`, {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
    body,
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error("Could not create profile");
    }

    return await res.json();
  });
}
