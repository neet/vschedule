import { IYoutubeWebsubService } from '../../app';

export const mockYoutubeWebsubService: IYoutubeWebsubService = {
  subscribeToChannel: jest.fn().mockResolvedValue(undefined),
};
