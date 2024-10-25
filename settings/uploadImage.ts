import { TypeImageUpload } from "@/components/core/common/upload-image";
import { constants } from "@/settings";

export const UploadImage = async (files: any) => {
  const formData = new FormData();
  let result: TypeImageUpload["inforUpload"] = [];

  formData.append("upload_preset", "goal_finder");

  for (const file of files) {
    formData.append("file", file);
    try {
      const data = await fetch(constants.ASSETS_URL_IMAGE, {
        method: "POST",
        body: formData,
      }).then((r) => r.json());

      result = [...result, { url: data?.url, size: data?.bytes }];
    } catch (err) {
      throw err;
    }
  }

  return result;
};
