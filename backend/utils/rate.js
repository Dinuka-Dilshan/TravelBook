export const calculateRating = (ratings) => {
  if (!ratings.length) return 0;
  const length = ratings.length;
  const total = ratings.reduce((total, rate) => total + rate.amount, 0);
  return Math.ceil(total / length);
};
