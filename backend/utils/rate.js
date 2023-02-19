const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,      
  maximumFractionDigits: 1,
});

export const calculateRating = (ratings) => {
  if (!ratings.length) return 0;
  const length = ratings.length;
  const total = ratings.reduce((total, rate) => total + rate.amount, 0);
  return formatter.format(total / length);
};
