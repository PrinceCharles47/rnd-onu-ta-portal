export const addONUFormFields = [
  { label: "ONU Name", type: "text", formkey: "onuName" },
  { label: "Model", type: "text", formkey: "model" },
  {
    label: "WiFi Type",
    type: "select",
    formkey: "wifiType",
    data: ["WiFi 5", "WiFi 6"],
  },
  { label: "Firmware", type: "text", formkey: "firmware" },
  { label: "ONT Type", type: "text", formkey: "ontType" },
  { label: "Product ID", type: "text", formkey: "productID" },
  { label: "Vendor ID", type: "text", formkey: "vendorID" },
  { label: "Equipment ID", type: "text", formkey: "equipmentID" },
  { label: "SN Format", type: "text", formkey: "snFormat" },
  { label: "Software Version", type: "text", formkey: "softwareVersion" },
  { label: "PON Chipset", type: "text", formkey: "ponChipset" },
  { label: "ONT Interface", type: "text", formkey: "ontInterface" },
  { label: "TCONT Numbers", type: "text", formkey: "tcontNumbers" },
  { label: "QOS-Queue Numbers", type: "text", formkey: "qosQueueNumbers" },
  { label: "IGMP Version", type: "text", formkey: "igmpVersion" },
  { label: "VOIP Protocol", type: "text", formkey: "voipProtocol" },
  {
    label: "3rd Party OLT Support",
    type: "text",
    formkey: "thirdPartyOLTSupport",
  },
];

export const newUserFormFields = [
  { label: "Username", type: "text", formkey: "username" },
  { label: "Email", type: "email", formkey: "email" },
  { label: "Password", type: "text", formkey: "password" },
  { label: "Confirm Password", type: "text", formkey: "passwordConfirm" },
  { label: "First Name", type: "text", formkey: "firstName" },
  { label: "Last Name", type: "text", formkey: "lastName" },
  { label: "Company Name", type: "text", formkey: "companyName" },
  { label: "Department", type: "text", formkey: "department" },

  {
    label: "Role",
    type: "select",
    formkey: "roleName",
    data: ["Vendor", "Research Team"],
  },
  {
    label: "Vendor",
    type: "select",
    formkey: "roleName",
    data: ["Huawei", "Nokia", "ZTE"],
  },
];
