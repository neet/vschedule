export interface File {
  readonly filename: string;
  readonly bucket?: string;
}

export interface Storage {
  create(filename: string, source: Buffer): Promise<File>;
}
