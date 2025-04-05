export const removeNonASCII = (value: string) => {
  return value?.replace(/[^\x00-\x7F]/g, "");
};
