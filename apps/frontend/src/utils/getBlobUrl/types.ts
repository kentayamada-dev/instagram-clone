type GetBlobUrlAndFileProps = {
  fileSizeExceededErrorMessage: string;
  files: FileList | null;
  maxFileSize: number;
};

type GetBlobUrlAndFileReturnType = {
  blobUrl: string;
  file: Blob;
};

export type GetBlobUrlAndFileType = (props: GetBlobUrlAndFileProps) => Promise<GetBlobUrlAndFileReturnType>;
