export const objectContainsKey = obj => key => {
  return Object.keys(obj).includes(key);
};

export const getObjectValue = obj => key => {
  if (!objectContainsKey(obj)(key)) {
    return null;
  }
  return obj[key];
};
