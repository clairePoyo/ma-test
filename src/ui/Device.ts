export const get = (): DeviceSizeString => {
  const width = window.innerWidth;
  if (width < 768) {
    return "mobile";
  }
  return "desktop";
};
