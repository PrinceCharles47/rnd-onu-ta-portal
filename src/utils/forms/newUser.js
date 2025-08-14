import { isNotEmpty, isEmail } from "@mantine/form";

export const newUserFormFields = [
  { label: "Username", type: "text", formkey: "username" },
  { label: "Email", type: "email", formkey: "email" },
  { label: "Password", type: "text", formkey: "password" },
  { label: "Confirm Password", type: "text", formkey: "passwordConfirm" },
  { label: "First Name", type: "text", formkey: "firstName" },
  { label: "Middle Name", type: "text", formkey: "middleName" },
  { label: "Last Name", type: "text", formkey: "lastName" },
  { label: "Company Name", type: "text", formkey: "companyName" },
  { label: "Department", type: "text", formkey: "department" },

  {
    label: "Role",
    type: "select",
    formkey: "roleName",
    data: [
      { value: "vendor", label: "Vendor" },
      { value: "admin", label: "Admin" },
    ],
  },
  {
    label: "Vendor",
    type: "select",
    formkey: "vendorType",
    data: [
      { value: "huawei", label: "Huawei" },
      { value: "nokia", label: "Nokia" },
      { value: "zte", label: "ZTE" },
    ],
  },
];

const validate = {
  username: (value) =>
    value.length < 8 ? "Username must have at least 8 characters." : null,

  email: isEmail("Input a valid email."),

  password: (value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s])[^\s]{8,}$/;
    return passwordRegex.test(value)
      ? null
      : "Password must be at least 8 characters long, include upper and lower case letters, a number, and a special character.";
  },

  passwordConfirm: (value, values) =>
    value !== values.password ? "Passwords do not match." : null,

  firstName: isNotEmpty("First name is required"),
  middleName: null,
  lastName: isNotEmpty("Last name is required."),
  companyName: isNotEmpty("Company name is required."),
  department: isNotEmpty("Department is required."),
  roleName: isNotEmpty("Role is required."),
  vendorType: (value, values) =>
    values.roleName === "vendor"
      ? value.length === 0
        ? "Vendor is required"
        : null
      : null,
};

export const newUserFormConfig = {
  mode: "uncontrolled",
  initialValues: {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    middleName: "",
    lastName: "",
    companyName: "",
    department: "",
    roleName: "",
    vendorType: "",
  },
  validate,
};
