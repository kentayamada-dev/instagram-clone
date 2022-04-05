export type CloudinaryResponseType = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  secure_url: string;
};

type GetImageUrlProps = {
  file: Blob;
};

export type GetImageUrlType = (props: GetImageUrlProps) => Promise<string>;
