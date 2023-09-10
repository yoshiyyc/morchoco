export const formatCurrency = (value) => {
  // If the number exists
  // If there is decimal, take the higher integer
  // Format it so price has a comma for every 3 digits
  return value && Math.ceil(value).toLocaleString();
};
