export namespace IFileAsset {
  export interface RO {
    id: number;
    createdAt: Date;
    filename: string;
    contentType: string;
    key: string;
    path: string;
  }

  export interface Upload {
    /**
     * @format binary
     */
    file: File;
  }
}
