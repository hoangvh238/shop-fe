import { constants } from "@/settings";

type Format = {
  url: string;
  size: number;
};

export const UploadImage = async (files: any) => {
  const formData = new FormData();
  let result: Format[] = [];

  formData.append("upload_preset", "goal_finder");

  for (const file of files) {
    formData.append("file", file);
    const data = await fetch(constants.ASSETS_URL_IMAGE, {
      method: "POST",
      body: formData,
    }).then((r) => r.json());

    result = [...result, { url: data?.url, size: data?.bytes }];
  }

  return result;
};
