// sortUtils.js
export const sortByLikes = (a, b) => {
  return b.views - a.views;
};

export const sortByDate = (a, b) => {
  return new Date(b.dates) - new Date(a.dates);
};

export const sortByMessages = (a, b) => {
  return b.messages - a.messages;
};
