export const host_url = "http://localhost:5000";

interface Picture {
  description: string;
  id: string;
}

export async function uploadImage(files: File[], token: string) {
  const pictures: Picture[] = [];

  for (const file of files) {
    const formData = new FormData();

    formData.append("picture", file);
    formData.append("description", "Auto-Uploaded image for a blog post");

    const response = await fetch(`${host_url}/api/pictures`, {
      method: "POST",
      body: formData,
      headers: new Headers({ Authorization: `Bearer ${token}` }),
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error("Could not upload image", await res.json());
      }

      return await res.json();
    });

    pictures.push({
      description: response.description,
      id: response.id,
    });
  }

  return pictures;
}

export function getPictureSrc(pictureId: string) {
  return `${host_url}/api/pictures/${pictureId}`;
}
