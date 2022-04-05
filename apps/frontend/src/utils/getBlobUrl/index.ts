import imageCompression from "browser-image-compression";
import type { GetBlobUrlAndFileType } from "./types";

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 500
};

export const getBlobUrlAndFile: GetBlobUrlAndFileType = async ({
  fileSizeExceededErrorMessage,
  files,
  maxFileSize
}) => {
  const file = files?.[0];
  if (file) {
    const fileSize = Math.ceil(file.size / (1024 * 1024));
    if (fileSize < maxFileSize) {
      const compressedFile: Blob = await imageCompression(file, options);
      const blobUrl = window.URL.createObjectURL(compressedFile);

      return {
        blobUrl,
        file: compressedFile
      };
    }
  }
  throw new Error(fileSizeExceededErrorMessage);
};
