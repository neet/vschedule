export const isWindows = (): boolean => {
  // eslint-disable-next-line
  return typeof window !== 'undefined' && window.navigator.userAgent.includes('Windows');
};
