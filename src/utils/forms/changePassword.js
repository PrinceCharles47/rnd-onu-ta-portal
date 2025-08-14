export const changePasswordFormFields = [
  { label: "New Password", type: "text", formkey: "newPassword" },
  { label: "Confirm Password", type: "text", formkey: "newPasswordConfirm" },
];

const validate = {
  newPassword: (value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s])[^\s]{8,}$/;
    return passwordRegex.test(value)
      ? null
      : "Password must be at least 8 characters long, include upper and lower case letters, a number, and a special character.";
  },

  newPasswordConfirm: (value, values) =>
    value !== values.newPassword ? "Passwords do not match." : null,
};

export const changePasswordFormConfig = {
  mode: "uncontrolled",
  initialValues: {
    newPassword: "",
    newPasswordConfirm: "",
  },
  validate,
};
