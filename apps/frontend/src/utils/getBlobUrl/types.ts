type GetBlobUrlAndFileProps = {
  files: FileList | null;
  maxFileSize: number;
  fileSizeExceededErrorMessage: string;
};

type GetBlobUrlAndFileReturnType = {
  file: Blob;
  blobUrl: string;
};

export type GetBlobUrlAndFileType = (
  props: GetBlobUrlAndFileProps
) => Promise<GetBlobUrlAndFileReturnType>;
