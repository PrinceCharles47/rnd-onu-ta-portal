import { isNotEmpty } from "@mantine/form";

export const usersFilterFormFields = [
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

export const usersFilterFormConfig = {
  mode: "uncontrolled",
  initialValues: {
    companyName: "",
    department: "",
    roleName: "",
    vendorType: "",
  },
};
