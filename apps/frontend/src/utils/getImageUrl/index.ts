import axios from "axios";
import { constants } from "../../constants";
import type { CloudinaryResponseType, GetImageUrlType } from "./types";
import type { AxiosResponse } from "axios";

const {
  CLOUDINARY: { UPLOAD_PRESET, API_URL }
} = constants;

export const getImageUrl: GetImageUrlType = async ({ file }) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", UPLOAD_PRESET);

  const imageUrl = await axios
    .post(API_URL, data)
    .then((response: AxiosResponse<CloudinaryResponseType>) => response.data.secure_url);

  return imageUrl;
};
