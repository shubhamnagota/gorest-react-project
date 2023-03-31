export const getErrorMessage = (error) => {
  const errorMessages = [];

  error?.response?.data?.forEach((obj) => {
    errorMessages.push(`${obj.field} ${obj.message}`);
  });

  return errorMessages.join(" | ");
};
