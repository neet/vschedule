import { IYoutubeWebsubService } from '../src/app';

export const mockYoutubeWebsubService: IYoutubeWebsubService = {
  subscribeToChannel: jest.fn().mockResolvedValue(undefined),
};
