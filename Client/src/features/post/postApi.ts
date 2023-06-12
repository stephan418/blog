import { host_url } from "../../app/api";
import { Post } from "./postSlice";

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

interface PostDto {
  title: string;
  text: string;
}

export async function createPost(post: PostDto, token: string) {
  const body = JSON.stringify(post);

  return await fetch(`${host_url}/api/post`, {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
    body,
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error("Could not create post", await res.json());
    }

    return await res.json();
  });
}

export async function updatePost(id: string, post: PostDto, token: string) {
  const jsonPatch = [
    {
      op: "add",
      path: "/title",
      value: post.title,
    },
    {
      op: "add",
      path: "/text",
      value: post.text,
    },
  ];

  const body = JSON.stringify(jsonPatch);

  return await fetch(`${host_url}/api/post/${id}`, {
    method: "PATCH",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
    body,
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error("Could not update post", await res.json());
    }

    return await res.json();
  });
}
