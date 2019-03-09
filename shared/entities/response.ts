export type Status = 'ok';

export interface Response<Data> {
  status: Status;
  data: Data;
}
