import { getThumbnailImageUrl } from 'src/helpers/get-thumbnail-image-url';

test('get thumbnail image url', () => {
  expect(getThumbnailImageUrl('123')).toMatchSnapshot();
});
