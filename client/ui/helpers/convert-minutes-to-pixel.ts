/**
 * Convert minutes to pixel based on grid spec
 * @param minutes   Minutes to convert
 * @param gridWidth Width of the grid
 * @param gridRange Range that the grid represents
 */
export const convertMinutesToPixel = (minutes: number, width: number, range: number) => {
  const perMintue = width / range;
  return minutes * perMintue;
}
