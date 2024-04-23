/**
 * Validates the user object and displays an alert if any required fields are missing.
 * @param {Object} user - The user object to validate.
 * @param {Function} setAlert - The function to set the alert.
 * @returns {boolean} - Returns true if the user is valid, otherwise returns false.
 */
const validateUser = (user, setAlert) => {
  if (user.email === "")
    return setAlert({
      type: "error",
      message: "Email is required",
    });
  if (user.user_type_id === 0)
    return setAlert({
      type: "error",
      message: "User type is required",
    });
  if (user.first_name === "")
    return setAlert({
      type: "error",
      message: "First name is required",
    });
  if (user.last_name === "")
    return setAlert({
      type: "error",
      message: "Last name is required",
    });
  if (user.phone === "")
    return setAlert({
      type: "error",
      message: "Phone is required",
    });
  if (user.address === "")
    return setAlert({
      type: "error",
      message: "Address is required",
    });
  if (user.born_date === "" || user.born_date === null)
    return setAlert({
      type: "error",
      message: "Born date is required",
    });
  if (user.password === "")
    return setAlert({
      type: "error",
      message: "Password is required",
    });
  return true;
};

export { validateUser };
