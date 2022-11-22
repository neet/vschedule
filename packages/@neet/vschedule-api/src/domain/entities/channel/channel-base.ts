import { Dayjs } from 'dayjs';

export interface IChannel {
  requestSubscription(): IChannel;
  verifySubscription(expiresAt: Dayjs): IChannel;
  canSubscribe(): boolean;
  isRequested(): boolean;
}
